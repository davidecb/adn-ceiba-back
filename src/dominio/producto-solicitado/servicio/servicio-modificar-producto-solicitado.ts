import { RepositorioProductoSolicitado } from '../puerto/repositorio/repositorio-producto-solicitado';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioModificarProductoSolicitado {

  constructor(private readonly _repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  }

  async ejecutar(id: number, valoresAModificar: object) {
    if (!await this._repositorioProductoSolicitado.existeIdProducto(id)) {
      throw new ErrorDeNegocio(
        `El id: "${id}", no existe en la base de productos`,
      );
    }

    if (!await this._repositorioProductoSolicitado.existenPropiedadesProducto(valoresAModificar)) {
      throw new ErrorDeNegocio(
        `Algunas propiedades enviadas no pertenecen a producto`,
      );
    }

    await this._repositorioProductoSolicitado.modificar(id, valoresAModificar);
  }
}
