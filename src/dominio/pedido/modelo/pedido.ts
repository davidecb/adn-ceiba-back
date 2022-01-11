import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
export class Pedido {
  readonly #id: number;
  readonly #numeroPedido: string;
  readonly #productosSolicitados: ProductosPorPedido[];
  readonly #direccion: string;
  readonly #cliente: string;
  readonly #estado: string;
  #costo: number;
  #tiempo: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;  

  constructor(
    id: number,
    numeroPedido: string,
    productosSolicitados: ProductosPorPedido[],
    direccion: string,
    cliente: string,
    estado: string,
    costo: number,
    tiempo: number,
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
  }

  calcularCostoTiempo() {
    const productosEnPedido = this.#productosSolicitados || [];
    let costoTotal = 0;
    let tiempoTotal = 0;

    productosEnPedido.forEach((producto) => {
      const costoProductos = producto.productoSolicitado.costo * producto.cantidad;
      const tiempoProductos = producto.productoSolicitado.tiempo * producto.cantidad;
      costoTotal += costoProductos;
      tiempoTotal += tiempoProductos;
    });

      this.#costo = costoTotal;
      this.#tiempo = tiempoTotal;
  }
  
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

  set costo(nuevoCosto: number) {
    this.#costo = nuevoCosto;
  }

  get tiempo(): number {
    return this.#tiempo;
  }

  set tiempo(nuevoTiempo: number) {
    this.#tiempo = nuevoTiempo;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
