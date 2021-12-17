import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';

export class ComandoRegistrarProductosPorPedido {
  @ApiProperty()
  id: number;

  @ApiProperty()
  pedido: Pedido;

  @ApiProperty()
  productoSolicitado: ProductoSolicitado;

  @IsNumber()
  @ApiProperty({ example: 3 })
  cantidad: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
