import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { ServicioEliminarProducto } from 'src/dominio/producto/servicio/servicio-eliminar-producto';

export function servicioEliminarProductoProveedor(repositorioProducto: RepositorioProducto) {
  return new ServicioEliminarProducto(repositorioProducto);
}
