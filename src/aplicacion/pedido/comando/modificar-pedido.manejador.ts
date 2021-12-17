import { Injectable } from '@nestjs/common';
import { ServicioModificarPedido } from 'src/dominio/pedido/servicio/servicio-modificar-pedido';
import { ComandoModificarPedido } from './modificar-pedido.comando';

@Injectable()
export class ManejadorModificarPedido {
  constructor(private _servicioModificarPedido: ServicioModificarPedido) {}

  async ejecutar(comandoModificarPedido: ComandoModificarPedido) {
    await this._servicioModificarPedido.ejecutar(
      comandoModificarPedido.id,
      comandoModificarPedido.valoresAModificar,     
    );
  }
}
