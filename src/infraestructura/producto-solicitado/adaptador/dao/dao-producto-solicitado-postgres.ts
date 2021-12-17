import { ProductoSolicitadoEntidad } from './../../entidad/producto-solicitado.entidad';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';
import { ProductoSolicitadoDto } from 'src/aplicacion/producto-solicitado/consulta/dto/producto-solicitado.dto';

@Injectable()
export class DaoProductoSolicitadoPostgres implements DaoProductoSolicitado {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<ProductoSolicitadoDto[]> {
    return this.entityManager.find<ProductoSolicitadoDto>(ProductoSolicitadoEntidad, { relations: ['producto'] });
  }
  
  async obtenerPorId(id: number): Promise<ProductoSolicitadoDto> {
    return this.entityManager.findOne<ProductoSolicitadoDto>(ProductoSolicitadoEntidad, { where: { id } , relations: ['producto'] });
  }
}
