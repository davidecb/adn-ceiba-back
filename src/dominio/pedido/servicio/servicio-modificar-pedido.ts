import { RepositorioPedido } from '../puerto/repositorio/repositorio-pedido';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioModificarPedido {

  constructor(private readonly _repositorioPedido: RepositorioPedido) {
  }

  async ejecutar(id: number, valoresAModificar: object) {
    if (!await this._repositorioPedido.existeIdPedido(id)) {
      throw new ErrorDeNegocio(
        `El id: "${id}", no existe en la base de pedidos`,
      );
    }

    if (!await this._repositorioPedido.existenPropiedadesPedido(valoresAModificar)) {
      throw new ErrorDeNegocio(
        `Algunas propiedades enviadas no pertenecen a pedido`,
      );
    }

    await this._repositorioPedido.modificar(id, valoresAModificar);
  }
}
