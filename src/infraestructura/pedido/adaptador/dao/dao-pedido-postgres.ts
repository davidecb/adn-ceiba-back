import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';
import { PedidoEntidad } from '../../entidad/pedido.entidad';

@Injectable()
export class DaoPedidoPostgres implements DaoPedido {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<PedidoDto[]> {
    return this.entityManager.find<PedidoDto>(PedidoEntidad, { relations: ['productosSolicitados'] });
  }
    
  async obtenerPorId(id: number): Promise<PedidoDto> {
    return this.entityManager.findOne<PedidoDto>(PedidoEntidad, { where: { id } });
  }
    
  async obtenerPedidosPorEstado(estado: string): Promise<PedidoDto[]> {
    return this.entityManager.find<PedidoDto>(PedidoEntidad, { where: { estado }, relations: ['productosSolicitados'] });
  }
}
