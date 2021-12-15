import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { RepositorioProductoSolicitadoPostgres } from 'src/infraestructura/producto-solicitado/adaptador/repositorio/repositorio-producto-solicitado-postgres';

export const repositorioProductoSolicitadoProvider = {
  provide: RepositorioProductoSolicitado,
  useClass: RepositorioProductoSolicitadoPostgres,
};
