import { IsBoolean, IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/dominio/producto/modelo/producto';

export class ComandoRegistrarProductoSolicitado {
  @IsNumber()
  @ApiProperty()
  id: number;

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
  
  @IsNumber()
  @ApiProperty({ example: 15000 })
  costo: number;
  
  @IsNumber()
  @ApiProperty({ example: 35 })
  tiempo: number;
  
  @IsDate()
  @ApiProperty()
  createdAt: Date;
  
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
