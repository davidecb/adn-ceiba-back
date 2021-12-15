import { Injectable } from '@nestjs/common';
import { ServicioEliminarProducto } from 'src/dominio/producto/servicio/servicio-eliminar-producto';
import { ComandoEliminarProducto } from './eliminar-producto.comando';

@Injectable()
export class ManejadorEliminarProducto {
  constructor(private _servicioEliminarProducto: ServicioEliminarProducto) {}

  async ejecutar(comandoEliminarProducto: ComandoEliminarProducto) {
    await this._servicioEliminarProducto.ejecutar(comandoEliminarProducto.id);
  }
}
