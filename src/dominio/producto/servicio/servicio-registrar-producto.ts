import { RepositorioProducto } from '../puerto/repositorio/repositorio-producto';
import { Producto } from '../modelo/producto';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarProducto {

  constructor(private readonly _repositorioProducto: RepositorioProducto) {
  }

  async ejecutar(producto: Producto): Promise<number> {
    if (await this._repositorioProducto.existeNombreProducto(producto.nombre)) {
      throw new ErrorDeNegocio(
        `El nombre de producto ${producto.nombre} ya existe`,
      );
    }
    return this._repositorioProducto.guardar(producto);
  }
}
