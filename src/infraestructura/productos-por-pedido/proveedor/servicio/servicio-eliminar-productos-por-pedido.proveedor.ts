import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';

export function servicioEliminarProductosPorPedidoProveedor(repositorioProductosPorPedido: RepositorioProductosPorPedido) {
  return new ServicioEliminarProductosPorPedido(repositorioProductosPorPedido);
}
