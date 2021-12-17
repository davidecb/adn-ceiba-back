import { RepositorioProductosPorPedido } from '../puerto/repositorio/repositorio-productos-por-pedido';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioEliminarProductosPorPedido {

  constructor(private readonly _repositorioProductosPorPedido: RepositorioProductosPorPedido) {
  }

  async ejecutar(id: number) {
    if (!await this._repositorioProductosPorPedido.existeIdProductosPorPedido(id)) {
      throw new ErrorDeNegocio(
        `El id: "${id}", no existe en la base de productos por pedido`,
      );
    }
    await this._repositorioProductosPorPedido.eliminar(id);
  }
}
