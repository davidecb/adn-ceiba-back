import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.comando';
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registar-producto.manejador';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-productos.manejador';
import { ManejadorObtenerProducto } from 'src/aplicacion/producto/consulta/obtener-producto.manejador';
import { ManejadorModificarProducto } from 'src/aplicacion/producto/comando/modificar-producto.manejador';
import { ManejadorEliminarProducto } from "src/aplicacion/producto/comando/eliminar-producto.manejador";
import { ProductoDto } from 'src/aplicacion/producto/consulta/dto/producto.dto';

@Controller('productos')
export class ProductoControlador {
  constructor(
    private readonly _manejadorRegistrarProducto: ManejadorRegistrarProducto,
    private readonly _manejadorListarProducto: ManejadorListarProducto,
    private readonly _manejadorObtenerProducto: ManejadorObtenerProducto,
    private readonly _manejadorEliminarProducto: ManejadorEliminarProducto,
    private readonly _manejadorModificarProducto: ManejadorModificarProducto,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarProducto: ComandoRegistrarProducto) {
    await this._manejadorRegistrarProducto.ejecutar(comandoRegistrarProducto);
  }

  @Get()
  async listar(): Promise<ProductoDto[]> {
    return this._manejadorListarProducto.ejecutar();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<ProductoDto> {
    return this._manejadorObtenerProducto.ejecutar(id);
  }

  @Patch(':id')
  async modificar(@Param('id', ParseIntPipe) id: number, @Body() valoresAModificar: object) {
    return this._manejadorModificarProducto.ejecutar({ id, valoresAModificar });
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return this._manejadorEliminarProducto.ejecutar({ id });
  }
}
