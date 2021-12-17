import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/dominio/producto/modelo/producto';

export class ComandoRegistrarProductoSolicitado {

  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  producto: Producto;
  
  @IsString()
  @ApiProperty({ example: 'PLA' })
  material: string;
  
  @IsString()
  @ApiProperty({ example: 'negro' })
  color: string;
  
  @IsObject()
  @ApiProperty({ example: {
    'pulido': true,
    'pintado': true,
    'barnizado': true
  } })
  acabado: object;

  @IsBoolean()
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
