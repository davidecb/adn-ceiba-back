import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoEliminarPedido {
  @IsNumber()
  @ApiProperty({ example: 2 })
  public id: number;
}
