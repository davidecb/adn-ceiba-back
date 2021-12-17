import { ProductoSolicitado } from '../../modelo/producto-solicitado';

export abstract class RepositorioProductoSolicitado {
  abstract async existeIdProducto(id: number): Promise<boolean>;
  abstract async existenPropiedadesProducto(valoresAModificar: object): Promise<boolean>;
  abstract async calcularCostoTiempo(productoSolicitado: ProductoSolicitado): Promise<any>;
  abstract async guardar(productoSolicitado: ProductoSolicitado): Promise<number>;
  abstract async modificar(id: number, valoresAModificar: object);
  abstract async eliminar(id: number);
}
