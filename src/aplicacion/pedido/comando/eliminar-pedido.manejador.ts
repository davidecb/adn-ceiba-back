import { Injectable } from '@nestjs/common';
import { ServicioEliminarPedido } from 'src/dominio/pedido/servicio/servicio-eliminar-pedido';
import { ComandoEliminarPedido } from './eliminar-pedido.comando';

@Injectable()
export class ManejadorEliminarPedido {
  constructor(private _servicioEliminarPedido: ServicioEliminarPedido) {}

  async ejecutar(comandoEliminarPedido: ComandoEliminarPedido) {
    await this._servicioEliminarPedido.ejecutar(comandoEliminarPedido.id);
  }
}
