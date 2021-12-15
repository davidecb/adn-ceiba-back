import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoEliminarProducto {
  @IsNumber()
  @ApiProperty({ example: 2 })
  public id: number;
}
