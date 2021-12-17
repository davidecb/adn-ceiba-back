import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/registrar-producto-solicitado.comando';
import { ManejadorRegistrarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/registar-producto-solicitado.manejador';
import { ManejadorListarProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/listar-productos-solicitados.manejador';
import { ManejadorObtenerProductoSolicitado } from './../../../aplicacion/producto-solicitado/consulta/obtener-producto-solicitado.manejador';
import { ManejadorModificarProductoSolicitado } from './../../../aplicacion/producto-solicitado/comando/modificar-producto-solicitado.manejador';
import { ManejadorEliminarProductoSolicitado } from './../../../aplicacion/producto-solicitado/comando/eliminar-producto-solicitado.manejador';
import { ProductoSolicitadoDto } from 'src/aplicacion/producto-solicitado/consulta/dto/producto-solicitado.dto';

@Controller('productos-solicitados')
export class ProductoSolicitadoControlador {
  constructor(
    private readonly _manejadorRegistrarProductoSolicitado: ManejadorRegistrarProductoSolicitado,
    private readonly _manejadorListarProductoSolicitado: ManejadorListarProductoSolicitado,
    private readonly _manejadorObtenerProductoSolicitado: ManejadorObtenerProductoSolicitado,
    private readonly _manejadorModificarProductoSolicitado: ManejadorModificarProductoSolicitado,
    private readonly _manejadorEliminarProductoSolicitado: ManejadorEliminarProductoSolicitado,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarProductoSolicitado: ComandoRegistrarProductoSolicitado) {
    return await this._manejadorRegistrarProductoSolicitado.ejecutar(comandoRegistrarProductoSolicitado);
  }

  @Get()
  async listar(): Promise<ProductoSolicitadoDto[]> {
    return this._manejadorListarProductoSolicitado.ejecutar();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<ProductoSolicitadoDto> {
    return this._manejadorObtenerProductoSolicitado.ejecutar(id);
  }

  @Patch(':id')
  async modificar(@Param('id', ParseIntPipe) id: number, @Body() valoresAModificar: object) {
    return this._manejadorModificarProductoSolicitado.ejecutar({ id, valoresAModificar });
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return this._manejadorEliminarProductoSolicitado.ejecutar({ id });
  }
}
