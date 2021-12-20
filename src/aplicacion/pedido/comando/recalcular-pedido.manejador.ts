import { Injectable } from '@nestjs/common';
import { ServicioRecalcularPedido } from 'src/dominio/pedido/servicio/servicio-recalcular-pedido';
import { ComandoRecalcularPedido } from './recalcular-pedido.comando';

@Injectable()
export class ManejadorRecalcularPedido {
  constructor(private _servicioRecalcularPedido: ServicioRecalcularPedido) {}

  async ejecutar(comandoRecalcularPedido: ComandoRecalcularPedido) {
    await this._servicioRecalcularPedido.ejecutar(
      comandoRecalcularPedido.id,    
    );
  }
}
