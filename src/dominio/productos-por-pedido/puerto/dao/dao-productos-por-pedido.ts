import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';

export abstract class DaoProductosPorPedido {
  abstract async listar(): Promise<ProductosPorPedidoDto[]>;  
  abstract async obtenerPorId(id: number): Promise<ProductosPorPedidoDto>;
}
