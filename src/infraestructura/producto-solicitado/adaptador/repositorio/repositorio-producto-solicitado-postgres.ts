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
  ) {}

  async existeIdProducto(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;      
  }

  async existenPropiedadesProducto(valoresAModificar: object): Promise<boolean> {
    const propiedadesProductoSolicitado = ['material', 'color', 'acabado', 'urgencia'];
    return Object.keys(valoresAModificar).every(valor => {
      propiedadesProductoSolicitado.includes(valor);
    });
  }

  async guardar(productoSolicitado: ProductoSolicitado) {
    const entidad = new ProductoSolicitadoEntidad();
    entidad.producto = productoSolicitado.producto;
    entidad.material = productoSolicitado.material;
    entidad.color = productoSolicitado.color;
    entidad.acabado = productoSolicitado.acabado;
    entidad.urgencia = productoSolicitado.urgencia;
    entidad.costo = productoSolicitado.costo;
    entidad.tiempo = productoSolicitado.tiempo;
    await this.repositorio.save(entidad);
  }

  async modificar(id: number, valoresAModificar: object) {
      await this.repositorio.update(id, valoresAModificar);
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
