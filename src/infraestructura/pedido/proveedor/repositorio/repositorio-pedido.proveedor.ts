import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { RepositorioPedidoPostgres } from 'src/infraestructura/pedido/adaptador/repositorio/repositorio-pedido-postgres';

export const repositorioPedidoProvider = {
  provide: RepositorioPedido,
  useClass: RepositorioPedidoPostgres,
};
