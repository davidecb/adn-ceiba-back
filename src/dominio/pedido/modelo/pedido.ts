import { ProductoEntidad } from './../../../infraestructura/producto/entidad/producto.entidad';
export class Pedido {
  readonly #numeroPedido: string;
  readonly #producto: ProductoEntidad;
  readonly #material: string;
  readonly #color: string;
  readonly #cantidad: number;
  readonly #pulido: boolean;
  readonly #pintado: boolean;
  readonly #barnizado: boolean;
  readonly #urgente: boolean;

  constructor(
    numeroPedido: string,
    producto: ProductoEntidad,
    material: string,
    color: string,
    cantidad: number,
    pulido: boolean,
    pintado: boolean,
    barnizado: boolean,
    urgente: boolean
  ) {
    this.#numeroPedido = numeroPedido;
    this.#producto = producto;
    this.#material = material || 'PLA';
    this.#color = color || 'blanco';
    this.#cantidad = cantidad || 1;
    this.#pulido = pulido || false;
    this.#pintado = pintado || false;
    this.#barnizado = barnizado || false;
    this.#urgente = urgente || false;
  }

  get numeroPedido(): string {
    return this.#numeroPedido;
  }

  get producto(): ProductoEntidad {
    return this.#producto;
  }

  get material(): string {
    return this.#material;
  }

  get color(): string {
    return this.#color;
  }

  get cantidad(): number {
    return this.#cantidad;
  }

  get pulido(): boolean {
    return this.#pulido;
  }

  get pintado(): boolean {
    return this.#pintado;
  }

  get barnizado(): boolean {
    return this.#barnizado;
  }

  get urgente(): boolean {
    return this.#urgente;
  }
}
