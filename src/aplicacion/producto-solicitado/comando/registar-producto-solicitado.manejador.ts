import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { Injectable } from '@nestjs/common';
import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';
import { ComandoRegistrarProductoSolicitado } from './registrar-producto-solicitado.comando';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';

@Injectable()
export class ManejadorRegistrarProductoSolicitado {
  constructor(
    private _servicioRegistrarProductoSolicitado: ServicioRegistrarProductoSolicitado,
    private _repositorioProducto: RepositorioProducto  
  ) {}

  async ejecutar(comandoRegistrarProductoSolicitado: ComandoRegistrarProductoSolicitado): Promise<number> {
    const productoId = comandoRegistrarProductoSolicitado.producto as unknown;
    const producto = await this._repositorioProducto.obtenerPorId(productoId as number);
    return this._servicioRegistrarProductoSolicitado.ejecutar(
      new ProductoSolicitado(
        comandoRegistrarProductoSolicitado.id,
        producto,
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
