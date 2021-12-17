import { RepositorioProducto } from '../puerto/repositorio/repositorio-producto';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioModificarProducto {

  constructor(private readonly _repositorioProducto: RepositorioProducto) {
  }

  async ejecutar(id: number, valoresAModificar: object) {
    if (!await this._repositorioProducto.existeIdProducto(id)) {
      throw new ErrorDeNegocio(
        `El id: '${id}', no existe en la base de productos`,
      );
    }

    if (!await this._repositorioProducto.existenPropiedadesProducto(valoresAModificar)) {
      throw new ErrorDeNegocio(
        `Algunas propiedades enviadas no pertenecen a producto`,
      );
    }

    await this._repositorioProducto.modificar(id, valoresAModificar);
  }
}
