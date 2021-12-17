import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/dao/dao-productos-por-pedido';
import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';
import { ProductosPorPedidoEntidad } from '../../entidad/productos-por-pedido.entidad';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';

@Injectable()
export class DaoProductosPorPedidoPostgres implements DaoProductosPorPedido {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<ProductosPorPedidoDto[]> {
    return this.entityManager.find<ProductosPorPedidoDto>(ProductosPorPedidoEntidad, { relations: ["productoSolicitado"] });
  }

  async obtenerPorId(id: number): Promise<ProductosPorPedidoDto> {
    return this.entityManager.findOne<ProductosPorPedido>(ProductosPorPedidoEntidad, {id});
  }
}
