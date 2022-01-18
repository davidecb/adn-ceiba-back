import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioEliminarUsuario {

  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {
  }

  async ejecutar(id: number) {
    if (!await this._repositorioUsuario.existeIdUsuario(id)) {
      throw new ErrorDeNegocio(
        `El id: ${id}, no existe en la base de usuarios`,
      );
    }
    await this._repositorioUsuario.eliminar(id);
  }
}
