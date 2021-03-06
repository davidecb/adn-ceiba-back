import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';

export abstract class DaoPedido {
  abstract async listar(): Promise<PedidoDto[]>;
  abstract async obtenerPorId(id: number): Promise<PedidoDto>;
  abstract async obtenerPedidosPorEstado(estado: string): Promise<PedidoDto[]>;
}
