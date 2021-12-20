import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { DaoPedido } from "src/dominio/pedido/puerto/dao/dao-pedido";
import { RepositorioPedido } from '../puerto/repositorio/repositorio-pedido';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRecalcularPedido {

  constructor(
    private readonly _repositorioPedido: RepositorioPedido,
    private readonly _daoPedido: DaoPedido
  ) {}

  async ejecutar(id: number) {
    if (!await this._repositorioPedido.existeIdPedido(id)) {
      throw new ErrorDeNegocio(
        `El id: ${id}, no existe en la base de pedidos`,
      );
    }

    const pedidoDto = await this._daoPedido.obtenerPorId(id);
   
    const pedido = new Pedido(
      id,
      pedidoDto.numeroPedido,
      pedidoDto.productosSolicitados,
      pedidoDto.direccion,
      pedidoDto.cliente,
      pedidoDto.estado,
      pedidoDto.costo,
      pedidoDto.tiempo,
      new Date,
      new Date
    );
    const { costo, tiempo } = await this._repositorioPedido.calcularCostoTiempo(pedido);
    const valoresAModificar = {
      costo,
      tiempo
    };

    await this._repositorioPedido.recalcular(id, valoresAModificar);
  }
}
