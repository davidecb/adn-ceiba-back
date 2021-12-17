import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarPedido {
  @ApiProperty()
  id: number;
  
  @IsString()
  @ApiProperty({ example: '12ajs5sfv34' })
  numeroPedido: string;

  @ApiProperty()
  productosSolicitados: ProductosPorPedido[];
  
  @IsString()
  @ApiProperty({ example: 'Cra 43 nro 16 - 64' })
  direccion: string;

  @IsString()
  @ApiProperty({ example: 'david cortés' })
  cliente: string;

  @IsString()
  @ApiProperty({ example: 'inicializando' })
  estado: string;

  @ApiProperty({ example: 2000 })
  costo: number;

  @ApiProperty({ example: 10 })
  tiempo: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
