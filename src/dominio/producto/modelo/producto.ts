import { ErrorImagenInvalida } from './../../errores/error-imagen-invalida';
export class Producto {
  readonly #id: number;
  readonly #nombre: string;
  readonly #costo: number;
  readonly #tiempo: number;
  readonly #imagen: string;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  constructor(id: number, nombre: string, costo: number, tiempo: number, imagen: string, createdAt: Date, updatedAt: Date) {
    this.validarImagenValida(imagen);
    this.#id = id;
    this.#nombre = nombre;
    this.#imagen = imagen || 'defaultImagen.jpg';
    this.#costo = costo;
    this.#tiempo = tiempo;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  private validarImagenValida(imagen: string) {
    if (
      imagen
      && !imagen.toString().match(/\.jpg+$/) 
      && !imagen.toString().match(/\.png+$/) 
      && !imagen.toString().match(/\.jpeg+$/)
    ) {
      throw new ErrorImagenInvalida(
        'La imagen debe estar en formato jpg, jpeg o png',
      );
    }
  }

  get id(): number {
    return this.#id;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get imagen(): string {
    return this.#imagen;
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
