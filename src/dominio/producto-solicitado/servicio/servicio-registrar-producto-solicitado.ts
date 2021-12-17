import { RepositorioProductoSolicitado } from '../puerto/repositorio/repositorio-producto-solicitado';
import { ProductoSolicitado } from '../modelo/producto-solicitado';

export class ServicioRegistrarProductoSolicitado {

  constructor(private readonly _repositorioProductoSolicitado: RepositorioProductoSolicitado) {
  }

  async ejecutar(productoSolicitado: ProductoSolicitado): Promise<number> {
    const { costo, tiempo } = await this._repositorioProductoSolicitado.calcularCostoTiempo(productoSolicitado);
    productoSolicitado.costo = Math.trunc(costo);    
    productoSolicitado.tiempo = tiempo;    
    return await this._repositorioProductoSolicitado.guardar(productoSolicitado);
  }
}
