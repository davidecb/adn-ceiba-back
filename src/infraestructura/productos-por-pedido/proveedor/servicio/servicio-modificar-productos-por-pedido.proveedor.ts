import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { ServicioModificarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-modificar-productos-por-pedido';

export function servicioModificarProductosPorPedidoProveedor(repositorioProductosPorPedido: RepositorioProductosPorPedido) {
  return new ServicioModificarProductosPorPedido(repositorioProductosPorPedido);
}
