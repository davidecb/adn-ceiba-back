import { RepositorioProductoSolicitado } from '../puerto/repositorio/repositorio-producto-solicitado';
import { ProductoSolicitado } from '../modelo/producto-solicitado';

export class ServicioRegistrarProductoSolicitado {

  constructor(private readonly _repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  }

  async ejecutar(productoSolicitado: ProductoSolicitado) {
    await this._repositorioProductoSolicitado.guardar(productoSolicitado);
  }
}
