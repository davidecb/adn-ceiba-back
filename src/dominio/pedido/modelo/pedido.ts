import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
export class Pedido {
  readonly #id: number;
  readonly #numeroPedido: string;
  readonly #productosSolicitados: ProductosPorPedido[];
  readonly #direccion: string;
  readonly #cliente: string;
  readonly #estado: string;
  readonly #costo: number;
  readonly #tiempo: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;  

  constructor(
    id: number,
    numeroPedido: string,
    productosSolicitados: ProductosPorPedido[],
    direccion: string,
    cliente: string,
    estado: string,
    costo: number | 1,
    tiempo: number | 1,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.#id = id;
    this.#numeroPedido = numeroPedido;
    this.#productosSolicitados = productosSolicitados;
    this.#direccion = direccion;
    this.#cliente = cliente;
    this.#estado = estado;
    this.#costo = costo;
    this.#tiempo = tiempo;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;   
  };
  
  get id(): number {
    return this.#id;
  }

  get numeroPedido(): string {
    return this.#numeroPedido;
  }

  get productosSolicitados(): ProductosPorPedido[] {
    return this.#productosSolicitados;
  }

  get direccion(): string {
    return this.#direccion;
  }

  get cliente(): string {
    return this.#cliente;
  }

  get estado(): string {
    return this.#estado;
  }

  get costo(): number {
    return this.#costo;
  }

  get tiempo(): number {
    return this.#tiempo;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
