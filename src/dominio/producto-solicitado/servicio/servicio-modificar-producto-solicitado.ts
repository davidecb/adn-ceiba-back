import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';
import { RepositorioProductoSolicitado } from '../puerto/repositorio/repositorio-producto-solicitado';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { ProductoSolicitado } from '../modelo/producto-solicitado';

export class ServicioModificarProductoSolicitado {

  constructor(
    private readonly _repositorioProductoSolicitado: RepositorioProductoSolicitado,
    private readonly _daoProductoSolicitado: DaoProductoSolicitado
  ) {}

  async ejecutar(id: number, valoresAModificar: object) {
    if (!await this._repositorioProductoSolicitado.existeIdProducto(id)) {
      throw new ErrorDeNegocio(
        `El id: '${id}', no existe en la base de productos`,
      );
    }

    if (!await this._repositorioProductoSolicitado.existenPropiedadesProducto(valoresAModificar)) {
      throw new ErrorDeNegocio(
        `Algunas propiedades enviadas no pertenecen a producto`,
      );
    }

    const productoSolicitadoDto = await this._daoProductoSolicitado.obtenerPorId(id);
    for (const key in valoresAModificar) {
      productoSolicitadoDto[key] = valoresAModificar[key]      
    }
    const productoSolicitado = new ProductoSolicitado(
      productoSolicitadoDto.id,
      productoSolicitadoDto.producto,
      productoSolicitadoDto.material,
      productoSolicitadoDto.color,
      productoSolicitadoDto.acabado,
      productoSolicitadoDto.urgencia,
      productoSolicitadoDto.costo,
      productoSolicitadoDto.tiempo,
      productoSolicitadoDto.createdAt,
      productoSolicitadoDto.updatedAt
    );
    const { costo, tiempo } = await this._repositorioProductoSolicitado.calcularCostoTiempo(productoSolicitado);
    const modificar = {
      ...valoresAModificar,
      costo,
      tiempo
    };
    await this._repositorioProductoSolicitado.modificar(id, modificar);
  }
}
