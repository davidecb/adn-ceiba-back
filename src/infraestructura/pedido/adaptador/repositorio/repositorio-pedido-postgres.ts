import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntidad } from '../../entidad/pedido.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioPedidoPostgres implements RepositorioPedido {
  constructor(
    @InjectRepository(PedidoEntidad)
    private readonly repositorio: Repository<PedidoEntidad>,
  ) {}

  async guardar(pedido: Pedido) {
    const entidad = new PedidoEntidad();
    entidad.numeroPedido = pedido.numeroPedido;
    entidad.productosSolicitados = pedido.productosSolicitados;
    entidad.direccion = pedido.direccion;
    entidad.cliente = pedido.cliente;
    entidad.costo = pedido.costo;
    entidad.tiempo = pedido.tiempo;
    await this.repositorio.save(entidad);
  }
}
