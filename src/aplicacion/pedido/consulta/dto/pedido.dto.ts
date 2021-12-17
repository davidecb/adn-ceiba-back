import { ProductosPorPedido } from "src/dominio/productos-por-pedido/modelo/productos-por-pedido";
import { ApiProperty } from '@nestjs/swagger';

export class PedidoDto {
  @ApiProperty({ example: '12ajs5sfv34' })
  numeroPedido: string;

  @ApiProperty()
  productosSolicitados: ProductosPorPedido[];
  
  @ApiProperty({ example: 'Cra 43 nro 16 - 64' })
  direccion: string;

  @ApiProperty({ example: 'david cortés' })
  cliente: string;

  @ApiProperty({ example: 2000 })
  costo: number;

  @ApiProperty({ example: 10 })
  tiempo: number;
}
