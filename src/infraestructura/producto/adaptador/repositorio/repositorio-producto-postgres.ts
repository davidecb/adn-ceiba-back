import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntidad } from '../../entidad/producto.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioProductoPostgres implements RepositorioProducto {
  constructor(
    @InjectRepository(ProductoEntidad)
    private readonly repositorio: Repository<ProductoEntidad>,
  ) {}

  async existeNombreProducto(nombre: string): Promise<boolean> {
    return (await this.repositorio.count({ nombre })) > 0;
  }

  async existeIdProducto(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;      
  }

  async existenPropiedadesProducto(valoresAModificar: object): Promise<boolean> {
    const propiedadesProducto = ['nombre', 'costo', 'tiempo', 'imagen'];
    const valoresArray = Object.keys(valoresAModificar);
    return valoresArray.every(valor => {
      return propiedadesProducto.includes(valor);
    });
  }

  async guardar(producto: Producto) {
    const entidad = new ProductoEntidad();
    entidad.costo = producto.costo;
    entidad.tiempo = producto.tiempo;
    entidad.nombre = producto.nombre;
    entidad.imagen = producto.imagen;
    await this.repositorio.save(entidad);
  }

  async modificar(id: number, valoresAModificar: object) {
      await this.repositorio.update(id, valoresAModificar);
  }

  async eliminar(id: number) {
      await this.repositorio.delete(id);
  }
}
