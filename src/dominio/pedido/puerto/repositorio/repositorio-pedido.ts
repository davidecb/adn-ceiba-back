import { Pedido } from '../../modelo/pedido';

export abstract class RepositorioPedido {
  abstract async existeNumeroPedido(numeroPedido: string): Promise<boolean>;
  abstract async existeIdPedido(id: number): Promise<boolean>;
  abstract async existenPropiedadesPedido(valoresAModificar: object): Promise<boolean>;
  abstract async calcularCostoTiempo(pedido: Pedido): Promise<{ costo: number, tiempo: number }>;
  abstract async guardar(pedido: Pedido): Promise<number>;
  abstract async modificar(id: number, valoresAModificar: object);
  abstract async recalcular(id: number, valoresAModificar: object);
  abstract async eliminar(id: number);
}
