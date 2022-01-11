import { Producto } from '../../modelo/producto';

export abstract class RepositorioProducto {
  abstract async existeNombreProducto(nombre: string): Promise<boolean>;
  abstract async existeIdProducto(id: number): Promise<boolean>;
  abstract async existenPropiedadesProducto(valoresAModificar: object): Promise<boolean>;
  abstract async obtenerPorId(id: number): Promise<Producto>;
  abstract async guardar(producto: Producto);
  abstract async modificar(id: number, valoresAModificar: object);
  abstract async eliminar(id: number);
}
