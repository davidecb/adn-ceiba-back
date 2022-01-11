import { ProductoSolicitado } from '../../modelo/producto-solicitado';

export abstract class RepositorioProductoSolicitado {
  abstract async existeIdProducto(id: number): Promise<boolean>;
  abstract async existenPropiedadesProducto(valoresAModificar: object): Promise<boolean>;
  abstract async obtenerPorId(id: number): Promise<ProductoSolicitado>;
  abstract async guardar(productoSolicitado: ProductoSolicitado): Promise<number>;
  abstract async modificar(productoSolicitado: ProductoSolicitado);
  abstract async eliminar(id: number);
}
