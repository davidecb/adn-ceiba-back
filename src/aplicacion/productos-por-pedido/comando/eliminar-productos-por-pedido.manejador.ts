import { Injectable } from '@nestjs/common';
import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';
import { ComandoEliminarProductosPorPedido } from './eliminar-productos-por-pedido.comando';

@Injectable()
export class ManejadorEliminarProductosPorPedido {
  constructor(private _servicioEliminarProductosPorPedido: ServicioEliminarProductosPorPedido) {}

  async ejecutar(comandoEliminarProductosPorPedido: ComandoEliminarProductosPorPedido) {
    await this._servicioEliminarProductosPorPedido.ejecutar(comandoEliminarProductosPorPedido.id);
  }
}
