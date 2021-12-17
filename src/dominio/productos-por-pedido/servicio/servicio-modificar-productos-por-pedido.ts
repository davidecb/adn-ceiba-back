import { RepositorioProductosPorPedido } from '../puerto/repositorio/repositorio-productos-por-pedido';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioModificarProductosPorPedido {

  constructor(private readonly _repositorioProductosPorPedido: RepositorioProductosPorPedido) {
  }

  async ejecutar(id: number, valoresAModificar: object) {
    if (!await this._repositorioProductosPorPedido.existeIdProductosPorPedido(id)) {
      throw new ErrorDeNegocio(
        `El id: "${id}", no existe en la base de productos por pedido`,
      );
    }

    if (!await this._repositorioProductosPorPedido.existenPropiedadesProductosPorPedido(valoresAModificar)) {
      throw new ErrorDeNegocio(
        `Algunas propiedades enviadas no pertenecen a productos por pedido`,
      );
    }

    await this._repositorioProductosPorPedido.modificar(id, valoresAModificar);
  }
}
