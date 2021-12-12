import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorImagenInvalida extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorImagenInvalida.name);
  }
}
