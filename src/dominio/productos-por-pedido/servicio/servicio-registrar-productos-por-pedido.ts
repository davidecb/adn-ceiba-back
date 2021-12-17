import { RepositorioProductosPorPedido } from '../puerto/repositorio/repositorio-productos-por-pedido';
import { ProductosPorPedido } from '../modelo/productos-por-pedido';

export class ServicioRegistrarProductosPorPedido {

  constructor(private readonly _repositorioProductosPorPedido: RepositorioProductosPorPedido) {
  }

  async ejecutar(productosPorPedido: ProductosPorPedido): Promise<number> {
    return await this._repositorioProductosPorPedido.guardar(productosPorPedido);
  }
}
