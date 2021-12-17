import { ProductosPorPedido } from '../../modelo/productos-por-pedido';

export abstract class RepositorioProductosPorPedido {
  abstract async existeIdProductosPorPedido(id: number): Promise<boolean>;
  abstract async existenPropiedadesProductosPorPedido(valoresAModificar: object): Promise<boolean>;
  abstract async guardar(pedido: ProductosPorPedido): Promise<number>;
  abstract async modificar(id: number, valoresAModificar: object);
  abstract async eliminar(id: number);
}
