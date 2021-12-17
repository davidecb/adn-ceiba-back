import { Injectable } from '@nestjs/common';
import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';
import { ComandoRegistrarProductoSolicitado } from './registrar-producto-solicitado.comando';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';

@Injectable()
export class ManejadorRegistrarProductoSolicitado {
  constructor(private _servicioRegistrarProductoSolicitado: ServicioRegistrarProductoSolicitado) {}

  async ejecutar(comandoRegistrarProductoSolicitado: ComandoRegistrarProductoSolicitado): Promise<number> {
    return await this._servicioRegistrarProductoSolicitado.ejecutar(
      new ProductoSolicitado(
        comandoRegistrarProductoSolicitado.id,
        comandoRegistrarProductoSolicitado.producto,
        comandoRegistrarProductoSolicitado.material,
        comandoRegistrarProductoSolicitado.color,
        comandoRegistrarProductoSolicitado.acabado,
        comandoRegistrarProductoSolicitado.urgencia,
        comandoRegistrarProductoSolicitado.costo,
        comandoRegistrarProductoSolicitado.tiempo,
        comandoRegistrarProductoSolicitado.createdAt,
        comandoRegistrarProductoSolicitado.updatedAt,
      ),
    );
  }
}
