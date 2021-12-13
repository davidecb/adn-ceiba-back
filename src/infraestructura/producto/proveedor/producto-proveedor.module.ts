import { ManejadorObtenerProducto } from 'src/aplicacion/producto/consulta/obtener-producto.manejador';
import { Module } from '@nestjs/common';
import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { servicioRegistrarProductoProveedor } from './servicio/servicio-registrar-producto.proveedor';
import { repositorioProductoProvider } from './repositorio/repositorio-producto.proveedor';
import { daoProductoProvider } from './dao/dao-producto.proveedor';
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registar-producto.manejador';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-productos.manejador';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntidad } from '../entidad/producto.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntidad])],
  providers: [
    { provide: ServicioRegistrarProducto, inject: [RepositorioProducto], useFactory: servicioRegistrarProductoProveedor },
    repositorioProductoProvider,
    daoProductoProvider,
    ManejadorRegistrarProducto,
    ManejadorListarProducto,
    ManejadorObtenerProducto,
  ],
  exports: [
    ServicioRegistrarProducto,
    ManejadorRegistrarProducto,
    ManejadorListarProducto,
    ManejadorObtenerProducto,
    RepositorioProducto,
    DaoProducto,
  ],
})
export class ProductoProveedorModule {

}
