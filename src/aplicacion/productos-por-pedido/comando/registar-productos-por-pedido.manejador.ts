import { Injectable } from '@nestjs/common';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';
import { ComandoRegistrarProductosPorPedido } from './registrar-productos-por-pedido.comando';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';

@Injectable()
export class ManejadorRegistrarProductosPorPedido {
  constructor(private _servicioRegistrarProductosPorPedido: ServicioRegistrarProductosPorPedido) {}

  async ejecutar(comandoRegistrarProductosPorPedido: ComandoRegistrarProductosPorPedido) {
    await this._servicioRegistrarProductosPorPedido.ejecutar(
      new ProductosPorPedido(
        comandoRegistrarProductosPorPedido.id,
        comandoRegistrarProductosPorPedido.pedido,
        comandoRegistrarProductosPorPedido.productoSolicitado,
        comandoRegistrarProductosPorPedido.cantidad,
        comandoRegistrarProductosPorPedido.createdAt,
        comandoRegistrarProductosPorPedido.updatedAt,
      ),
    );
  }
}
