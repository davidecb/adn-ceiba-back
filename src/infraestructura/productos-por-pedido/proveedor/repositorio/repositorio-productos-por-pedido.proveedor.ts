import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { RepositorioProductosPorPedidoPostgres } from 'src/infraestructura/productos-por-pedido/adaptador/repositorio/repositorio-productos-por-pedido-postgres';

export const repositorioProductosPorPedidoProvider = {
  provide: RepositorioProductosPorPedido,
  useClass: RepositorioProductosPorPedidoPostgres,
};
