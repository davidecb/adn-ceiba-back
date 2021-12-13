import { ProductoEntidad } from './../../../../infraestructura/producto/entidad/producto.entidad';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoDto {
  @ApiProperty({ example: '1234' })
  numero_pedido: string;

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
