import { Injectable } from '@nestjs/common';
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { ComandoRegistrarPedido } from './registrar-pedido.comando';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';

@Injectable()
export class ManejadorRegistrarPedido {
  constructor(private _servicioRegistrarPedido: ServicioRegistrarPedido) {}

  async ejecutar(comandoRegistrarPedido: ComandoRegistrarPedido): Promise<number> {
    return await this._servicioRegistrarPedido.ejecutar(
      new Pedido(
        comandoRegistrarPedido.id,
        comandoRegistrarPedido.numeroPedido,
        comandoRegistrarPedido.productosSolicitados,
        comandoRegistrarPedido.direccion,
        comandoRegistrarPedido.cliente,
        comandoRegistrarPedido.estado,
        comandoRegistrarPedido.costo,
        comandoRegistrarPedido.tiempo,
        comandoRegistrarPedido.createdAt,
        comandoRegistrarPedido.updatedAt,
      ),
    );
  }
}
