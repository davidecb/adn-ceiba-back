import { DaoProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/dao/dao-productos-por-pedido';
import { DaoProductosPorPedidoPostgres } from 'src/infraestructura/productos-por-pedido/adaptador/dao/dao-productos-por-pedido-postgres';

export const daoProductosPorPedidoProvider = {
  provide: DaoProductosPorPedido,
  useClass: DaoProductosPorPedidoPostgres,
};
