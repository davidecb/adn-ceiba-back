import { IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoModificarProductosPorPedido {
  @IsNumber()
  @ApiProperty({ example: 1 })
  public id: number;

  @IsObject()
  @ApiProperty({ example: { costo: 20000 } })
  public valoresAModificar: object;
}
