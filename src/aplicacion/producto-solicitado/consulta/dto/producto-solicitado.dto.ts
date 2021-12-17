import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/dominio/producto/modelo/producto';

export class ProductoSolicitadoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  producto: Producto;
  
  @ApiProperty({ example: 'PLA' })
  material: string;
  
  @ApiProperty({ example: 'negro' })
  color: string;
  
  @ApiProperty({ example: {
    'pulido': true,
    'pintado': true,
    'barnizado': true
  } })
  acabado: object;

  @ApiProperty({ example: false})
  urgencia: boolean;
  
  @ApiProperty({ example: 15000 })
  costo: number;
  
  @ApiProperty({ example: 35 })
  tiempo: number;
  
  @ApiProperty()
  createdAt: Date;
  
  @ApiProperty()
  updatedAt: Date;
}
