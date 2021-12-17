import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarProducto {

  @ApiProperty({ example: 1})
  public id: number;

  @IsString()
  @ApiProperty({ example: 'figura de accion'})
  public nombre: string;
  
  @ApiProperty()
  public imagen: string;

  @IsNumber()
  @ApiProperty({ example: 15000 })
  public costo: number;

  @IsNumber()
  @ApiProperty({ example: 2 })
  public tiempo: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
