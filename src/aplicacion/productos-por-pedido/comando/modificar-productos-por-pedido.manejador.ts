import { Injectable } from '@nestjs/common';
import { ServicioModificarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-modificar-productos-por-pedido';
import { ComandoModificarProductosPorPedido } from './modificar-productos-por-pedido.comando';

@Injectable()
export class ManejadorModificarProductosPorPedido {
  constructor(private _servicioModificarProductosPorPedido: ServicioModificarProductosPorPedido) {}

  async ejecutar(comandoModificarProductosPorPedido: ComandoModificarProductosPorPedido) {
    await this._servicioModificarProductosPorPedido.ejecutar(
      comandoModificarProductosPorPedido.id,
      comandoModificarProductosPorPedido.valoresAModificar,     
    );
  }
}
