import { ManejadorObtenerProducto } from "src/aplicacion/producto/consulta/obtener-producto.manejador";
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoSolicitadoEntidad } from '../../entidad/producto-solicitado.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioProductoSolicitadoPostgres implements RepositorioProductoSolicitado {
  constructor(
    @InjectRepository(ProductoSolicitadoEntidad)
    private readonly repositorio: Repository<ProductoSolicitadoEntidad>,
    private readonly _manejadorObtenerProducto: ManejadorObtenerProducto,
  ) {}

  async existeIdProducto(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;      
  }

  async existenPropiedadesProducto(valoresAModificar: object): Promise<boolean> {
    const propiedadesProductoSolicitado = ['material', 'color', 'acabado', 'urgencia'];
    return Object.keys(valoresAModificar).every(valor => {
      return propiedadesProductoSolicitado.includes(valor);
    });
  }

  async calcularCostoTiempo(productoSolicitado: ProductoSolicitado): Promise<object> {
      const prod = productoSolicitado.producto.hasOwnProperty('id') ?
          productoSolicitado.producto.id : 
          productoSolicitado.producto as unknown;
      const producto = await this._manejadorObtenerProducto.ejecutar(prod as number);
      const valoresAcabado = Object.values(productoSolicitado.acabado); 
      const costoBase = producto.costo;
      const tiempoBase = producto.tiempo;
      let multiplicadorCosto = 1.0;
      let multiplicadorTiempo = 1.0;

      switch (productoSolicitado.material) {
        case 'ABS':
          multiplicadorCosto += 0.2;
          multiplicadorTiempo += 0.2;
          break;
      
        default:
          break;
      }
      switch (productoSolicitado.color) {
        case 'negro mate':
          multiplicadorCosto += 0.1;
          break;

        case 'madera':
          multiplicadorCosto += 0.3;
          break;

        case 'plata':
          multiplicadorCosto += 0.4;
          break;
      
        default:
          break;
      }
      if (valoresAcabado[0]) {
        multiplicadorCosto += 0.2;
        multiplicadorTiempo += 0.4;
      }
      if (valoresAcabado[1]) {
        multiplicadorCosto += 0.3;
        multiplicadorTiempo += 0.5;
      }
      if (valoresAcabado[2]) {
        multiplicadorCosto += 0.3;
        multiplicadorTiempo += 0.6;
      }
      if (productoSolicitado.urgencia) {
        multiplicadorCosto += 0.2;
      }
      const costoTiempo = {
        costo: (costoBase * multiplicadorCosto),
        tiempo: (tiempoBase * multiplicadorTiempo)
      }
      return costoTiempo;
  }


  async guardar(productoSolicitado: ProductoSolicitado): Promise<number>  {
    const entidad = new ProductoSolicitadoEntidad();
    entidad.producto = productoSolicitado.producto;
    entidad.material = productoSolicitado.material;
    entidad.color = productoSolicitado.color;
    entidad.acabado = productoSolicitado.acabado;
    entidad.urgencia = productoSolicitado.urgencia;
    entidad.costo = productoSolicitado.costo;
    entidad.tiempo = productoSolicitado.tiempo;
    return await (await this.repositorio.save(entidad)).id;
  }

  async modificar(id: number, valoresAModificar: object) {
      await this.repositorio.update(id, valoresAModificar);
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
