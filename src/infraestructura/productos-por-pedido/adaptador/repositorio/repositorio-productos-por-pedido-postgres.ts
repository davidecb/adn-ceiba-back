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

  async guardar(productosPorPedido: ProductosPorPedido) {
    const entidad = new ProductosPorPedidoEntidad();
    entidad.pedido = productosPorPedido.pedido;
    entidad.productoSolicitado = productosPorPedido.productoSolicitado;
    entidad.cantidad = productosPorPedido.cantidad;
    await this.repositorio.save(entidad);
  }
}
