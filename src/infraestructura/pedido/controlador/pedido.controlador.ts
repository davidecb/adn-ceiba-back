import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.comando';
import { ManejadorRegistrarPedido } from 'src/aplicacion/pedido/comando/registar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedidos.manejador';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';
import { ManejadorObtenerPedido } from 'src/aplicacion/pedido/consulta/obtener-pedido.manejador';
import { ManejadorEliminarPedido } from 'src/aplicacion/pedido/comando/eliminar-pedido.manejador';
import { ManejadorModificarPedido } from 'src/aplicacion/pedido/comando/modificar-pedido.manejador';
import { ManejadorObtenerPedidosPorEstado } from 'src/aplicacion/pedido/consulta/obtener-pedidos-por-estado.manejador';
import { ManejadorRecalcularPedido } from 'src/aplicacion/pedido/comando/recalcular-pedido.manejador';

@Controller('pedidos')
export class PedidoControlador {
  constructor(
    private readonly _manejadorRegistrarPedido: ManejadorRegistrarPedido,
    private readonly _manejadorListarPedido: ManejadorListarPedido,
    private readonly _manejadorObtenerPedido: ManejadorObtenerPedido,
    private readonly _manejadorObtenerPedidosPorEstado: ManejadorObtenerPedidosPorEstado,
    private readonly _manejadorEliminarPedido: ManejadorEliminarPedido,
    private readonly _manejadorModificarPedido: ManejadorModificarPedido,
    private readonly _manejadorRecalcularPedido: ManejadorRecalcularPedido,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarPedido: ComandoRegistrarPedido) {
    return this._manejadorRegistrarPedido.ejecutar(comandoRegistrarPedido);
  }

  @Get()
  async listar(): Promise<PedidoDto[]> {
    return this._manejadorListarPedido.ejecutar();
  }

  @Get('estado?')
  async obtenerPedidosPorEstado(@Query('estado') estado: string): Promise<PedidoDto[]> {
    return this._manejadorObtenerPedidosPorEstado.ejecutar(estado);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<PedidoDto> {
    return this._manejadorObtenerPedido.ejecutar(id);
  }

  @Patch('recalcular/:id')
  async recalcularPedido(@Param('id', ParseIntPipe) id: number) {
    return this._manejadorRecalcularPedido.ejecutar({ id });
  }

  @Patch(':id')
  async modificar(@Param('id', ParseIntPipe) id: number, @Body() valoresAModificar: object) {
    return this._manejadorModificarPedido.ejecutar({ id, valoresAModificar });
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return this._manejadorEliminarPedido.ejecutar({ id });
  }
}
