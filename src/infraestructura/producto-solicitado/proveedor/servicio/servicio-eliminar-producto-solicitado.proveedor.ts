import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { ServicioEliminarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-eliminar-producto-solicitado';

export function servicioEliminarProductoSolicitadoProveedor(repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  return new ServicioEliminarProductoSolicitado(repositorioProductoSolicitado);
}
