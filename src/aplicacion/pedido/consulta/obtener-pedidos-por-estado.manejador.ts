import { Injectable } from '@nestjs/common';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';

@Injectable()
export class ManejadorObtenerPedidosPorEstado {
  constructor(private _daoPedido: DaoPedido) {}

  async ejecutar(estado: string): Promise<PedidoDto[]> {
    return this._daoPedido.obtenerPedidosPorEstado(estado);
  }
}
