import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { ServicioModificarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-modificar-producto-solicitado';

export function servicioModificarProductoSolicitadoProveedor(repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  return new ServicioModificarProductoSolicitado(repositorioProductoSolicitado);
}
