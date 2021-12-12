import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { DaoProductoPostgres } from 'src/infraestructura/producto/adaptador/dao/dao-producto-postgres';

export const daoProductoProvider = {
  provide: DaoProducto,
  useClass: DaoProductoPostgres,
};
