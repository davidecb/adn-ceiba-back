import { ErrorImagenInvalida } from "./../../errores/error-imagen-invalida";
export class Producto {
  readonly #nombre: string;
  readonly #costo: number;
  readonly #tiempo: number;
  readonly #imagen: string;

  constructor(nombre: string, costo: number, tiempo: number, imagen: string) {
    this.validarImagenValida(imagen);
    this.#nombre = nombre;
    this.#imagen = imagen || 'noImage.jpg';
    this.#costo = costo;
    this.#tiempo = tiempo;
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
}
