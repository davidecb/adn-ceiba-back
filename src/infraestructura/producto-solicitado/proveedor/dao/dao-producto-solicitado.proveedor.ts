import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';
import { DaoProductoSolicitadoPostgres } from 'src/infraestructura/producto-solicitado/adaptador/dao/dao-producto-solicitado-postgres';

export const daoProductoSolicitadoProvider = {
  provide: DaoProductoSolicitado,
  useClass: DaoProductoSolicitadoPostgres,
};
