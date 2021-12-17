import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ServicioModificarPedido } from 'src/dominio/pedido/servicio/servicio-modificar-pedido';

export function servicioModificarPedidoProveedor(repositorioPedido: RepositorioPedido) {
  return new ServicioModificarPedido(repositorioPedido);
}
