import { Producto } from 'src/dominio/producto/modelo/producto';
import { ErrorPropiedadesFaltantes } from './../../errores/error-propiedades-faltantes';

export class ProductoSolicitado {
  readonly #id: number;
  readonly #producto: Producto;
  readonly #material: string;
  readonly #color: string;
  readonly #acabado: object;
  readonly #urgencia: boolean;
  #costo: number;
  #tiempo: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;
  private readonly numeroPropiedadesAcabado = 3;

  constructor(
    id: number,
    producto: Producto ,
    material: string,
    color: string,
    acabado: object,
    urgencia: boolean,
    costo: number | 0,
    tiempo: number | 0,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.validarAcabadoProducto(acabado);
    this.#id = id;
    this.#producto = producto;
    this.#material = material;
    this.#color = color;
    this.#acabado = acabado;
    this.#urgencia = urgencia;
    this.#costo = costo;
    this.#tiempo = tiempo;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  private validarAcabadoProducto(acabado: object) {
    if (
      Object.keys(acabado).length !== this.numeroPropiedadesAcabado
      || !acabado.hasOwnProperty('pulido')
      || !acabado.hasOwnProperty('pintado')
      || !acabado.hasOwnProperty('barnizado')
    ) {
      throw new ErrorPropiedadesFaltantes(
        'El objeto: acabado, debe tener las propiedades pulido, pintado y barnizado',
      );
    }
  }

  get id(): number {
    return this.#id;
  }

  get producto(): Producto {
    return this.#producto;
  }

  get material(): string {
    return this.#material;
  }

  get color(): string {
    return this.#color;
  }

  get acabado(): object {
    return this.#acabado;
  }

  get urgencia(): boolean {
    return this.#urgencia;
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
