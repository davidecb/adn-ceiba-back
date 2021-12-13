import { ProductoEntidad } from './../../../infraestructura/producto/entidad/producto.entidad';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarPedido {
  @IsString()
  @ApiProperty({ example: '1234' })
  numeroPedido: string;

  @ApiProperty()
  producto: ProductoEntidad;
  
  @ApiProperty({ example: 'ABS' })
  material: string;

  @ApiProperty({ example: 'negro' })
  color: string;

  @ApiProperty({ example: 2 })
  cantidad: number;

  @ApiProperty({ example: true })
  pulido: boolean;

  @ApiProperty({ example: false })
  pintado: boolean;

  @ApiProperty({ example: true })
  barnizado: boolean;

  @ApiProperty({ example: true })
  urgente: boolean;
}
