import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'William' })
  nombre: string;
}
