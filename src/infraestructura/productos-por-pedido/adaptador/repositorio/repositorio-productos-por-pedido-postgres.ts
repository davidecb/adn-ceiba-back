import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosPorPedidoEntidad } from '../../entidad/productos-por-pedido.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioProductosPorPedidoPostgres implements RepositorioProductosPorPedido {
  constructor(
    @InjectRepository(ProductosPorPedidoEntidad)
    private readonly repositorio: Repository<ProductosPorPedidoEntidad>,
  ) {}

  async existeIdProductosPorPedido(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;      
  }

  async existenPropiedadesProductosPorPedido(valoresAModificar: object): Promise<boolean> {
    const propiedadesProductosPorPedido = ['pedido', 'cantidad'];
    return Object.keys(valoresAModificar).every(valor => {
      return propiedadesProductosPorPedido.includes(valor);
    });
  }

  async guardar(productosPorPedido: ProductosPorPedido): Promise<number> {
    const entidad = new ProductosPorPedidoEntidad();
    entidad.pedido = productosPorPedido.pedido;
    entidad.productoSolicitado = productosPorPedido.productoSolicitado;
    entidad.cantidad = productosPorPedido.cantidad;
    return (await this.repositorio.save(entidad)).id;
  }
  
  async modificar(id: number, valoresAModificar: object) {
    await this.repositorio.update(id, valoresAModificar);
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
