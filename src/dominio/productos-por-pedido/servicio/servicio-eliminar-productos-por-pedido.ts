import { RepositorioProductosPorPedido } from '../puerto/repositorio/repositorio-productos-por-pedido';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';

export class ServicioEliminarProductosPorPedido {

  constructor(
    private readonly _repositorioProductosPorPedido: RepositorioProductosPorPedido,
    private readonly _repositorioPedido: RepositorioPedido,
  ) {
  }

  async ejecutar(id: number) {
    if (!await this._repositorioProductosPorPedido.existeIdProductosPorPedido(id)) {
      throw new ErrorDeNegocio(
        `El id: ${id}, no existe en la base de productos por pedido`,
      );
    }
    const productosPorPedido = await this._repositorioProductosPorPedido.obtenerPorId(id);
    const pedidoId = productosPorPedido.pedido as unknown;
    const response = await this._repositorioProductosPorPedido.eliminar(id);
    const pedido = await this._repositorioPedido.obtenerPorId(pedidoId as number);    
    productosPorPedido.pedido = pedido;
    productosPorPedido.pedido.calcularCostoTiempo();
    await this._repositorioPedido.modificar(productosPorPedido.pedido.id, {
      costo: productosPorPedido.pedido.costo,
      tiempo: productosPorPedido.pedido.tiempo
    })
    return response;   
  }
}
