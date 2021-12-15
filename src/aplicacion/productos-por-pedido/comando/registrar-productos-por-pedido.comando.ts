import { IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';

export class ComandoRegistrarProductosPorPedido {
  @IsNumber()
  @ApiProperty()
  id: number;

  @ApiProperty()
  pedido: Pedido;

  @ApiProperty()
  productoSolicitado: ProductoSolicitado;

  @IsNumber()
  @ApiProperty({ example: 3 })
  cantidad: number;
      
  @IsDate()
  @ApiProperty()
  createdAt: Date;
  
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
