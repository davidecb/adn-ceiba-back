import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ServicioRecalcularPedido } from 'src/dominio/pedido/servicio/servicio-recalcular-pedido';

export function servicioRecalcularPedidoProveedor(repositorioPedido: RepositorioPedido, daoPedido: DaoPedido) {
  return new ServicioRecalcularPedido(repositorioPedido, daoPedido);
}
