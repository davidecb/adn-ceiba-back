import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.comando';
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registar-producto.manejador';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-productos.manejador';
import { ProductoDto } from 'src/aplicacion/producto/consulta/dto/producto.dto';

@Controller('productos')
export class ProductoControlador {
  constructor(
    private readonly _manejadorRegistrarProducto: ManejadorRegistrarProducto,
    private readonly _manejadorListarProducto: ManejadorListarProducto,
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
}
