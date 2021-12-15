import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorPropiedadesFaltantes extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorPropiedadesFaltantes.name);
  }
}
