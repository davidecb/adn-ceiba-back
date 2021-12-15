import { ProductoEntidad } from './../../entidad/producto.entidad';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { ProductoDto } from 'src/aplicacion/producto/consulta/dto/producto.dto';

@Injectable()
export class DaoProductoPostgres implements DaoProducto {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<ProductoDto[]> {
    return this.entityManager.query(
      'SELECT * FROM PRODUCTO u',
    );
  }
  
  async obtenerPorId(id: number): Promise<ProductoDto> {
    return this.entityManager.findOne<ProductoEntidad>(ProductoEntidad, {id});
  }
}
