import { Producto } from '../../modelo/producto';

export abstract class RepositorioProducto {
  abstract existeNombreProducto(nombre: string): Promise<boolean>;
  abstract guardar(producto: Producto);
}
