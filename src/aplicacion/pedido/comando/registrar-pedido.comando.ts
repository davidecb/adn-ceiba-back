import { ProductosPorPedido } from "src/dominio/productos-por-pedido/modelo/productos-por-pedido";
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarPedido {
  @IsNumber()
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

  @IsNumber()
  @ApiProperty({ example: 2000 })
  costo: number;

  @IsNumber()
  @ApiProperty({ example: 10 })
  tiempo: number;
    
  @IsDate()
  @ApiProperty()
  createdAt: Date;
  
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
