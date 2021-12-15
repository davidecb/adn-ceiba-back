import { ApiProperty } from '@nestjs/swagger';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';

export class PedidoDto {
  @ApiProperty({ example: '12ajs5sfv34' })
  numeroPedido: string;

  @ApiProperty()
  productosSolicitados: ProductoSolicitado[];
  
  @ApiProperty({ example: 'Cra 43 nro 16 - 64' })
  direccion: string;

  @ApiProperty({ example: 'david cortés' })
  cliente: string;

  @ApiProperty({ example: 2000 })
  costo: number;

  @ApiProperty({ example: 10 })
  tiempo: number;
}
