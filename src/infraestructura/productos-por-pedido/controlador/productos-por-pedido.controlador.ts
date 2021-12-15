import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registrar-productos-por-pedido.comando';
import { ManejadorRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registar-productos-por-pedido.manejador';
import { ManejadorListarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/listar-productos-por-pedido.manejador';
import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';

@Controller('productos-por-pedido')
export class ProductosPorPedidoControlador {
  constructor(
    private readonly _manejadorRegistrarProductosPorPedido: ManejadorRegistrarProductosPorPedido,
    private readonly _manejadorListarProductosPorPedido: ManejadorListarProductosPorPedido,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarProductosPorPedido: ComandoRegistrarProductosPorPedido) {
    await this._manejadorRegistrarProductosPorPedido.ejecutar(comandoRegistrarProductosPorPedido);
  }

  @Get()
  async listar(): Promise<ProductosPorPedidoDto[]> {
    return this._manejadorListarProductosPorPedido.ejecutar();
  }
}
