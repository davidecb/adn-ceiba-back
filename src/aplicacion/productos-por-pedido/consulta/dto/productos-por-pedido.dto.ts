import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { ApiProperty } from '@nestjs/swagger';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';

export class ProductosPorPedidoDto {
  @ApiProperty()
  pedido: Pedido;

  @ApiProperty()
  productoSolicitado: ProductoSolicitado;

  @ApiProperty({ example: 3 })
  cantidad: number;
}
