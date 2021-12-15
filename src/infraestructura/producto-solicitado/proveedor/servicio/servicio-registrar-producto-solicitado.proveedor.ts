import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';

export function servicioRegistrarProductoSolicitadoProveedor(repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  return new ServicioRegistrarProductoSolicitado(repositorioProductoSolicitado);
}
