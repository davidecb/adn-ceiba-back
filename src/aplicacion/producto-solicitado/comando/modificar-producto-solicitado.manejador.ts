import { Injectable } from '@nestjs/common';
import { ServicioModificarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-modificar-producto-solicitado';
import { ComandoModificarProductoSolicitado } from './modificar-producto-solicitado.comando';

@Injectable()
export class ManejadorModificarProductoSolicitado {
  constructor(private _servicioModificarProductoSolicitado: ServicioModificarProductoSolicitado) {}

  async ejecutar(comandoModificarProductoSolicitado: ComandoModificarProductoSolicitado) {
    await this._servicioModificarProductoSolicitado.ejecutar(
      comandoModificarProductoSolicitado.id,
      comandoModificarProductoSolicitado.valoresAModificar,     
    );
  }
}
