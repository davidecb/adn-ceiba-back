import { ProductoSolicitado } from "src/dominio/producto-solicitado/modelo/producto-solicitado";
import { Pedido } from "src/dominio/pedido/modelo/pedido";
export class ProductosPorPedido {
  readonly #id: number;
  readonly #pedido: Pedido;
  readonly #productoSolicitado: ProductoSolicitado;
  readonly #cantidad: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  constructor(
    id: number,
    pedido: Pedido,
    productoSolicitado: ProductoSolicitado,
    cantidad: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.#id = id;
    this.#pedido = pedido;
    this.#productoSolicitado = productoSolicitado;
    this.#cantidad = cantidad;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id(): number {
    return this.#id;
  }

  get pedido(): Pedido {
    return this.#pedido;
  }

  get productoSolicitado(): ProductoSolicitado {
    return this.#productoSolicitado;
  }

  get cantidad(): number {
    return this.#cantidad;
  }
  
  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
