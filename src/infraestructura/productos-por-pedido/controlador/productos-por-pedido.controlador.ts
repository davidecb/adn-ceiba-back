import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registrar-productos-por-pedido.comando';
import { ManejadorRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registar-productos-por-pedido.manejador';
import { ManejadorListarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/listar-productos-por-pedido.manejador';
import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';
import { ManejadorModificarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/modificar-productos-por-pedido.manejador';
import { ManejadorEliminarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/eliminar-productos-por-pedido.manejador';
import { ManejadorObtenerProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/obtener-producto-por-pedido.manejador';

@Controller('productos-por-pedido')
export class ProductosPorPedidoControlador {
  constructor(
    private readonly _manejadorRegistrarProductosPorPedido: ManejadorRegistrarProductosPorPedido,
    private readonly _manejadorModificarProductosPorPedido: ManejadorModificarProductosPorPedido,
    private readonly _manejadorEliminarProductosPorPedido: ManejadorEliminarProductosPorPedido,
    private readonly _manejadorListarProductosPorPedido: ManejadorListarProductosPorPedido,
    private readonly _manejadorObtenerProductosPorPedido: ManejadorObtenerProductosPorPedido,
    ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarProductosPorPedido: ComandoRegistrarProductosPorPedido): Promise<number> {
    return this._manejadorRegistrarProductosPorPedido.ejecutar(comandoRegistrarProductosPorPedido);
  }

  @Get()
  async listar(): Promise<ProductosPorPedidoDto[]> {
    return this._manejadorListarProductosPorPedido.ejecutar();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<ProductosPorPedidoDto> {
    return this._manejadorObtenerProductosPorPedido.ejecutar(id);
  }

  @Patch(':id')
  async modificar(@Param('id', ParseIntPipe) id: number, @Body() valoresAModificar: object) {
    return this._manejadorModificarProductosPorPedido.ejecutar({ id, valoresAModificar });
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return this._manejadorEliminarProductosPorPedido.ejecutar({ id });
  }
}
