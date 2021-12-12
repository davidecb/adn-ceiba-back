import { Pedido } from '../../modelo/pedido';

export abstract class RepositorioPedido {
  abstract guardar(pedido: Pedido);
}
