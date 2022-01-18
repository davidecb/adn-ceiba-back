import { Injectable } from '@nestjs/common';
import { ServicioEliminarUsuario } from 'src/dominio/usuario/servicio/servicio-eliminar-usuario';
import { ComandoEliminarUsuario } from './eliminar-usuario.comando';

@Injectable()
export class ManejadorEliminarUsuario {
  constructor(private _servicioEliminarUsuario: ServicioEliminarUsuario) {}

  async ejecutar(comandoEliminarUsuario: ComandoEliminarUsuario) {
    await this._servicioEliminarUsuario.ejecutar(comandoEliminarUsuario.id);
  }
}
