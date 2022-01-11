import { ProductosPorPedido } from "src/dominio/productos-por-pedido/modelo/productos-por-pedido";
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
    private readonly repositorio: Repository<PedidoEntidad>) {}

  async existeNumeroPedido(numeroPedido: string): Promise<boolean> {
    return (await this.repositorio.count({ numeroPedido })) > 0;
  }

  async existeIdPedido(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;      
  }

  async existenPropiedadesPedido(valoresAModificar: object): Promise<boolean> {
    const propiedadesPedido = ['direccion', 'cliente', 'estado'];
    return Object.keys(valoresAModificar).every(valor => {
      return propiedadesPedido.includes(valor);
    });
  }
      
  async obtenerPorId(id: number): Promise<Pedido> {
    const entidad = await this.repositorio.findOne(id, { relations: ['productosSolicitados'] });
    return new Pedido(
      entidad.id,
      entidad.numeroPedido,
      entidad.productosSolicitados as ProductosPorPedido[],
      entidad.direccion,
      entidad.cliente,
      entidad.estado,
      entidad.costo,
      entidad.tiempo,
      entidad.createdAt,
      entidad.updatedAt
    )
  }

  async guardar(pedido: Pedido): Promise<number> {
    const entidad = new PedidoEntidad();
    entidad.numeroPedido = pedido.numeroPedido;
    entidad.productosSolicitados = pedido.productosSolicitados;
    entidad.direccion = pedido.direccion;
    entidad.cliente = pedido.cliente;
    entidad.estado = pedido.estado;
    entidad.costo = pedido.costo;
    entidad.tiempo = pedido.tiempo;
    return (await this.repositorio.save(entidad)).id;
  }
  
  async modificar(id: number, valoresAModificar: object) {
    await this.repositorio.update(id, valoresAModificar);
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
