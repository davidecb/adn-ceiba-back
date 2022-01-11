import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';

export function servicioRegistrarProductosPorPedidoProveedor(
  repositorioProductosPorPedido: RepositorioProductosPorPedido,
  repositorioPedido: RepositorioPedido
) {
  return new ServicioRegistrarProductosPorPedido(repositorioProductosPorPedido, repositorioPedido);
}
