import { RepositorioProductoSolicitado } from '../puerto/repositorio/repositorio-producto-solicitado';
import { ProductoSolicitado } from '../modelo/producto-solicitado';

export class ServicioRegistrarProductoSolicitado {
  constructor(private readonly _repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  }

  async ejecutar(productoSolicitado: ProductoSolicitado): Promise<number> {
    productoSolicitado.calcularCostoTiempo();
    if (productoSolicitado.id && await this._repositorioProductoSolicitado.existeIdProducto(productoSolicitado.id)){
      return this._repositorioProductoSolicitado.modificar(productoSolicitado);  
    } else {
      return this._repositorioProductoSolicitado.guardar(productoSolicitado);
    }
  }
}
