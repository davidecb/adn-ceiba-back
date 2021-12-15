import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';

export function servicioRegistrarProductosPorPedidoProveedor(repositorioProductosPorPedido: RepositorioProductosPorPedido) {
  return new ServicioRegistrarProductosPorPedido(repositorioProductosPorPedido);
}
