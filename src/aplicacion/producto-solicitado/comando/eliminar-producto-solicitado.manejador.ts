import { Injectable } from '@nestjs/common';
import { ServicioEliminarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-eliminar-producto-solicitado';
import { ComandoEliminarProductoSolicitado } from './eliminar-producto-solicitado.comando';

@Injectable()
export class ManejadorEliminarProductoSolicitado {
  constructor(private _servicioEliminarProductoSolicitado: ServicioEliminarProductoSolicitado) {}

  async ejecutar(comandoEliminarProductoSolicitado: ComandoEliminarProductoSolicitado) {
    await this._servicioEliminarProductoSolicitado.ejecutar(comandoEliminarProductoSolicitado.id);
  }
}
