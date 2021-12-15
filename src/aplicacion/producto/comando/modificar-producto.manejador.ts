import { Injectable } from '@nestjs/common';
import { ServicioModificarProducto } from 'src/dominio/producto/servicio/servicio-modificar-producto';
import { ComandoModificarProducto } from './modificar-producto.comando';

@Injectable()
export class ManejadorModificarProducto {
  constructor(private _servicioModificarProducto: ServicioModificarProducto) {}

  async ejecutar(comandoModificarProducto: ComandoModificarProducto) {
    await this._servicioModificarProducto.ejecutar(
      comandoModificarProducto.id,
      comandoModificarProducto.valoresAModificar,     
    );
  }
}
