import { ManejadorObtenerProducto } from 'src/aplicacion/producto/consulta/obtener-producto.manejador';
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

    const costoMaterialABS = 0.2;
    const tiempoMaterialABS = 0.2;
    const costoColorNegroMate = 0.1;
    const costoColorMadera = 0.3;
    const costoColorPlata = 0.4;
    const costoAcabadoPulido = 0.2;
    const tiempoAcabadoPulido = 0.4;
    const costoAcabadoPintado = 0.3;
    const tiempoAcabadoPintado = 0.5;
    const costoAcabadoBarnizado = 0.3;
    const tiempoAcabadoBarnizado = 0.6;
    const costoUrgencia = 0.3;

    if (productoSolicitado.material === 'ABS') {
        multiplicadorCosto += costoMaterialABS;
        multiplicadorTiempo += tiempoMaterialABS;
    }    
    switch (productoSolicitado.color) {
      case 'negro mate':
        multiplicadorCosto += costoColorNegroMate;
        break;

      case 'madera':
        multiplicadorCosto += costoColorMadera;
        break;

      case 'plata':
        multiplicadorCosto += costoColorPlata;
        break;
    
      default:
        break;
    }
    if (valoresAcabado[0]) {
      multiplicadorCosto += costoAcabadoPulido;
      multiplicadorTiempo += tiempoAcabadoPulido;
    }
    if (valoresAcabado[1]) {
      multiplicadorCosto += costoAcabadoPintado;
      multiplicadorTiempo += tiempoAcabadoPintado;
    }
    if (valoresAcabado[2]) {
      multiplicadorCosto += costoAcabadoBarnizado;
      multiplicadorTiempo += tiempoAcabadoBarnizado;
    }
    if (productoSolicitado.urgencia) {
      multiplicadorCosto += costoUrgencia;
    }
    
    return {
      costo: (costoBase * multiplicadorCosto),
      tiempo: (tiempoBase * multiplicadorTiempo)
    };
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
    return (await this.repositorio.save(entidad)).id;
  }

  async modificar(id: number, valoresAModificar: object) {
      await this.repositorio.update(id, valoresAModificar);
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
