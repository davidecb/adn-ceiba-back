import { RepositorioProducto } from '../puerto/repositorio/repositorio-producto';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioEliminarProducto {

  constructor(private readonly _repositorioProducto: RepositorioProducto) {
  }

  async ejecutar(id: number) {
    if (!await this._repositorioProducto.existeIdProducto(id)) {
      throw new ErrorDeNegocio(
        `El id: "${id}", no existe en la base de productos`,
      );
    }
    await this._repositorioProducto.eliminar(id);
  }
}
