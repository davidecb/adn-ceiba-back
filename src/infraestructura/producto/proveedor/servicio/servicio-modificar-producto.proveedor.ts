import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { ServicioModificarProducto } from 'src/dominio/producto/servicio/servicio-modificar-producto';

export function servicioModificarProductoProveedor(repositorioProducto: RepositorioProducto) {
  return new ServicioModificarProducto(repositorioProducto);
}
