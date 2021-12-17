import { RepositorioPedido } from '../puerto/repositorio/repositorio-pedido';
import { Pedido } from '../modelo/pedido';
import { ErrorDeNegocio } from './../../errores/error-de-negocio';

export class ServicioRegistrarPedido {

  constructor(private readonly _repositorioPedido: RepositorioPedido) {
  }

  async ejecutar(pedido: Pedido): Promise<number> {
    if (await this._repositorioPedido.existeNumeroPedido(pedido.numeroPedido)) {
      throw new ErrorDeNegocio(
        `El numero de pedido ${pedido.numeroPedido} ya existe`,
      );
    }
    return await this._repositorioPedido.guardar(pedido);
  }
}
