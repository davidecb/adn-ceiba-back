import { RepositorioProductoSolicitado } from '../puerto/repositorio/repositorio-producto-solicitado';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioEliminarProductoSolicitado {

  constructor(private readonly _repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  }

  async ejecutar(id: number) {
    if (!await this._repositorioProductoSolicitado.existeIdProducto(id)) {
      throw new ErrorDeNegocio(
        `El id: "${id}", no existe en la base de productos`,
      );
    }
    await this._repositorioProductoSolicitado.eliminar(id);
  }
}
