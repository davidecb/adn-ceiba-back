import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { RepositorioProductosPorPedido } from '../puerto/repositorio/repositorio-productos-por-pedido';
import { ProductosPorPedido } from '../modelo/productos-por-pedido';

export class ServicioRegistrarProductosPorPedido {

  constructor(
    private readonly _repositorioProductosPorPedido: RepositorioProductosPorPedido,
    private readonly _repositorioPedido: RepositorioPedido,
  ) {}

  async ejecutar(productosPorPedido: ProductosPorPedido): Promise<number> {
    const response = await this._repositorioProductosPorPedido.guardar(productosPorPedido);
    const pedidoId = productosPorPedido.pedido.id 
        ? productosPorPedido.pedido.id
        : productosPorPedido.pedido as unknown;
    const pedido = await this._repositorioPedido.obtenerPorId(pedidoId as number);    
    productosPorPedido.pedido = pedido;
    productosPorPedido.pedido.calcularCostoTiempo();
    await this._repositorioPedido.modificar(productosPorPedido.pedido.id, {
      costo: productosPorPedido.pedido.costo,
      tiempo: productosPorPedido.pedido.tiempo
    });
    return response;
  }
}
