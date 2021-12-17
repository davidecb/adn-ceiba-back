import { Injectable } from '@nestjs/common';
import { DaoProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/dao/dao-productos-por-pedido';
import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';

@Injectable()
export class ManejadorObtenerProductosPorPedido {
  constructor(private _daoProductosPorPedido: DaoProductosPorPedido) {}

  async ejecutar(id: number): Promise<ProductosPorPedidoDto> {
    return this._daoProductosPorPedido.obtenerPorId(id);
  }
}
