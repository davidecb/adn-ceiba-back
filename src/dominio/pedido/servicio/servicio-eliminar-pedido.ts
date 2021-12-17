import { RepositorioPedido } from '../puerto/repositorio/repositorio-pedido';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioEliminarPedido {

  constructor(private readonly _repositorioPedido: RepositorioPedido) {
  }

  async ejecutar(id: number) {
    if (!await this._repositorioPedido.existeIdPedido(id)) {
      throw new ErrorDeNegocio(
        `El id: '${id}', no existe en la base de pedidos`,
      );
    }
    await this._repositorioPedido.eliminar(id);
  }
}
