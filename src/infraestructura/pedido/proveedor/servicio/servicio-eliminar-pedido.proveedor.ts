import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ServicioEliminarPedido } from 'src/dominio/pedido/servicio/servicio-eliminar-pedido';

export function servicioEliminarPedidoProveedor(repositorioPedido: RepositorioPedido) {
  return new ServicioEliminarPedido(repositorioPedido);
}
