import { Injectable } from '@nestjs/common';
import { DaoProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/dao/dao-productos-por-pedido';
import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';

@Injectable()
export class ManejadorListarProductosPorPedido {
  constructor(private _daoProductosPorPedido: DaoProductosPorPedido) {}

  async ejecutar(): Promise<ProductosPorPedidoDto[]> {
    return this._daoProductosPorPedido.listar();
  }
}
