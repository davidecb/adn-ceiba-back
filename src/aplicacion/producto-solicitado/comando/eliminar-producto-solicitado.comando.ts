import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoEliminarProductoSolicitado {
  @IsNumber()
  @ApiProperty({ example: 2 })
  public id: number;
}
