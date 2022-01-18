import { Injectable } from '@nestjs/common';
import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { ComandoRegistrarProducto } from './registrar-producto.comando';
import { Producto } from 'src/dominio/producto/modelo/producto';

@Injectable()
export class ManejadorRegistrarProducto {
  constructor(private _servicioRegistrarProducto: ServicioRegistrarProducto) {}

  async ejecutar(comandoRegistrarProducto: ComandoRegistrarProducto): Promise<number> {
    return this._servicioRegistrarProducto.ejecutar(
      new Producto(
        comandoRegistrarProducto.id,
        comandoRegistrarProducto.nombre,
        comandoRegistrarProducto.costo,
        comandoRegistrarProducto.tiempo,
        comandoRegistrarProducto.imagen,
        comandoRegistrarProducto.createdAt,
        comandoRegistrarProducto.updatedAt,
      ),
    );
  }
}
