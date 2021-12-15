import { IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoModificarProductoSolicitado {
  @IsNumber()
  @ApiProperty({ example: 1 })
  public id: number;

  @IsObject()
  @ApiProperty({ example: { color: 'blanco' } })
  public valoresAModificar: object;
}
