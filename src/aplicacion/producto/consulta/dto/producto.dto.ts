import { ApiProperty } from '@nestjs/swagger';

export class ProductoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'figura de accion'})
  nombre: string;

  @ApiProperty()
  imagen: string;

  @ApiProperty({ example: 15000 })
  costo: number;

  @ApiProperty({ example: 2 })
  tiempo: number;
}
