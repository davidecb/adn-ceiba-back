import { ProductosPorPedido } from '../../modelo/productos-por-pedido';

export abstract class RepositorioProductosPorPedido {
  abstract guardar(pedido: ProductosPorPedido);
}
