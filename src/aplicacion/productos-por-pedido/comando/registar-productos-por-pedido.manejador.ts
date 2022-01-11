import { RepositorioProductoSolicitado } from "src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado";
import { Injectable } from '@nestjs/common';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';
import { ComandoRegistrarProductosPorPedido } from './registrar-productos-por-pedido.comando';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';

@Injectable()
export class ManejadorRegistrarProductosPorPedido {
  constructor(
    private _servicioRegistrarProductosPorPedido: ServicioRegistrarProductosPorPedido,
    private _repositorioProductoSolicitado: RepositorioProductoSolicitado,
  ) {}

  async ejecutar(comandoRegistrarProductosPorPedido: ComandoRegistrarProductosPorPedido): Promise<number> {
    
    const productoSolicitadoId = comandoRegistrarProductosPorPedido.productoSolicitado as unknown;
    const productoSolicitado = await this._repositorioProductoSolicitado.obtenerPorId(productoSolicitadoId as number);
        
    return this._servicioRegistrarProductosPorPedido.ejecutar(
      new ProductosPorPedido(
        comandoRegistrarProductosPorPedido.id,
        comandoRegistrarProductosPorPedido.pedido,
        productoSolicitado,
        comandoRegistrarProductosPorPedido.cantidad,
        comandoRegistrarProductosPorPedido.createdAt,
        comandoRegistrarProductosPorPedido.updatedAt,
      ),
    );
  }
}
