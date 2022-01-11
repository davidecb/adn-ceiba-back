import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoSolicitadoEntidad } from '../../entidad/producto-solicitado.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Producto } from 'src/dominio/producto/modelo/producto';

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
      return propiedadesProductoSolicitado.includes(valor);
    });
  }
    
  async obtenerPorId(id: number): Promise<ProductoSolicitado> {
    const entidad = await this.repositorio.findOne(id, { relations: ['producto'] });
    return new ProductoSolicitado(
      entidad.id,
      entidad.producto as Producto,
      entidad.material,
      entidad.color,
      entidad.acabado,
      entidad.urgencia,
      entidad.costo,
      entidad.tiempo,
      entidad.createdAt,
      entidad.updatedAt
    );
  }

  async guardar(productoSolicitado: ProductoSolicitado): Promise<number>  {
    const productoId = productoSolicitado.producto.id as unknown;
    const entidad = new ProductoSolicitadoEntidad();
    entidad.producto = productoId as Producto;
    entidad.material = productoSolicitado.material;
    entidad.color = productoSolicitado.color;
    entidad.acabado = productoSolicitado.acabado;
    entidad.urgencia = productoSolicitado.urgencia;
    entidad.costo = productoSolicitado.costo;
    entidad.tiempo = productoSolicitado.tiempo;
    return (await this.repositorio.save(entidad)).id;
  }

  async modificar(productoSolicitado: ProductoSolicitado) {
    await this.repositorio.update(productoSolicitado.id, {
      material: productoSolicitado.material,
      color: productoSolicitado.color,
      acabado: productoSolicitado.acabado,
      urgencia: productoSolicitado.urgencia,
      costo: productoSolicitado.costo,
      tiempo: productoSolicitado.tiempo,
    });
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
