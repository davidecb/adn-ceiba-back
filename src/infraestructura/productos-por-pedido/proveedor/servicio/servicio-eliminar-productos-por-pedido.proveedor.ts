import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';

export function servicioEliminarProductosPorPedidoProveedor(
  repositorioProductosPorPedido: RepositorioProductosPorPedido,
  repositorioPedido: RepositorioPedido,
) {
  return new ServicioEliminarProductosPorPedido(repositorioProductosPorPedido, repositorioPedido);
}
