import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRecalcularPedido {
  @IsNumber()
  @ApiProperty({ example: 1 })
  public id: number;
}
