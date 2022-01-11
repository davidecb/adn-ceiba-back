import { Producto } from 'src/dominio/producto/modelo/producto';
import { ErrorPropiedadesFaltantes } from './../../errores/error-propiedades-faltantes';

const numeroPropiedadesAcabado = 3;
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

  constructor(
    id: number,
    producto: Producto,
    material: string,
    color: string,
    acabado: object,
    urgencia: boolean,
    costo: number,
    tiempo: number,
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
      Object.keys(acabado).length !== numeroPropiedadesAcabado
      || !acabado.hasOwnProperty('pulido')
      || !acabado.hasOwnProperty('pintado')
      || !acabado.hasOwnProperty('barnizado')
    ) {
      throw new ErrorPropiedadesFaltantes(
        'El objeto: acabado, debe tener las propiedades pulido, pintado y barnizado',
      );
    }
  }

  calcularCostoTiempo() {

    const valoresAcabado = Object.values(this.#acabado); 
    const costoBase = this.#producto.costo;
    const tiempoBase = this.#producto.tiempo;
    let multiplicadorCosto = 1.0;
    let multiplicadorTiempo = 1.0;

    const costoMaterialABS = 0.2;
    const tiempoMaterialABS = 0.2;
    const costoColorNegroMate = 0.1;
    const costoColorMadera = 0.3;
    const costoColorPlata = 0.4;
    const costoAcabadoPulido = 0.2;
    const tiempoAcabadoPulido = 0.4;
    const costoAcabadoPintado = 0.3;
    const tiempoAcabadoPintado = 0.5;
    const costoAcabadoBarnizado = 0.3;
    const tiempoAcabadoBarnizado = 0.6;
    const costoUrgencia = 0.3;
    const indexAcabadoPulido = 0;
    const indexAcabadoPintado = 1;
    const indexAcabadoBarnizado = 2;

    if (this.#material === 'ABS') {
        multiplicadorCosto += costoMaterialABS;
        multiplicadorTiempo += tiempoMaterialABS;
    }    
    switch (this.#color) {
      case 'negro mate':
        multiplicadorCosto += costoColorNegroMate;
        break;

      case 'madera':
        multiplicadorCosto += costoColorMadera;
        break;

      case 'plata':
        multiplicadorCosto += costoColorPlata;
        break;
    
      default:
        break;
    }
    if (valoresAcabado[indexAcabadoPulido]) {
      multiplicadorCosto += costoAcabadoPulido;
      multiplicadorTiempo += tiempoAcabadoPulido;
    }
    if (valoresAcabado[indexAcabadoPintado]) {
      multiplicadorCosto += costoAcabadoPintado;
      multiplicadorTiempo += tiempoAcabadoPintado;
    }
    if (valoresAcabado[indexAcabadoBarnizado]) {
      multiplicadorCosto += costoAcabadoBarnizado;
      multiplicadorTiempo += tiempoAcabadoBarnizado;
    }
    if (this.#urgencia) {
      multiplicadorCosto += costoUrgencia;
    }  
    
    this.#costo = Math.trunc(costoBase * multiplicadorCosto);
    this.#tiempo = (tiempoBase * multiplicadorTiempo);
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
