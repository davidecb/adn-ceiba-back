import { DaoProductoSolicitado } from "src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado";
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { ServicioModificarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-modificar-producto-solicitado';

export function servicioModificarProductoSolicitadoProveedor(
  repositorioProductoSolicitado: RepositorioProductoSolicitado,
  daoProductoSolicitado: DaoProductoSolicitado
) {
  return new ServicioModificarProductoSolicitado(
    repositorioProductoSolicitado,
    daoProductoSolicitado
  );
}
