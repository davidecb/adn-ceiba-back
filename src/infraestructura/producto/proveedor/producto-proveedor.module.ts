import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { repositorioProductoProvider } from './repositorio/repositorio-producto.proveedor';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';

import { daoProductoProvider } from './dao/dao-producto.proveedor';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { ProductoEntidad } from '../entidad/producto.entidad';

import { servicioRegistrarProductoProveedor } from './servicio/servicio-registrar-producto.proveedor';
import { ServicioRegistrarProducto } from "src/dominio/producto/servicio/servicio-registrar-producto";
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registar-producto.manejador';

import { servicioModificarProductoProveedor } from './servicio/servicio-modificar-producto.proveedor';
import { ServicioModificarProducto } from "src/dominio/producto/servicio/servicio-modificar-producto";
import { ManejadorModificarProducto } from "src/aplicacion/producto/comando/modificar-producto.manejador";

import { servicioEliminarProductoProveedor } from './servicio/servicio-eliminar-producto.proveedor';
import { ServicioEliminarProducto } from "src/dominio/producto/servicio/servicio-eliminar-producto";
import { ManejadorEliminarProducto } from "src/aplicacion/producto/comando/eliminar-producto.manejador";

import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-productos.manejador';
import { ManejadorObtenerProducto } from 'src/aplicacion/producto/consulta/obtener-producto.manejador';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntidad])],
  providers: [
    { provide: ServicioRegistrarProducto, inject: [RepositorioProducto], useFactory: servicioRegistrarProductoProveedor },
    { provide: ServicioModificarProducto, inject: [RepositorioProducto], useFactory: servicioModificarProductoProveedor },
    { provide: ServicioEliminarProducto, inject: [RepositorioProducto], useFactory: servicioEliminarProductoProveedor },
    repositorioProductoProvider,
    daoProductoProvider,
    ManejadorRegistrarProducto,
    ManejadorListarProducto,
    ManejadorObtenerProducto,
    ManejadorEliminarProducto,
    ManejadorModificarProducto,
  ],
  exports: [
    ServicioRegistrarProducto,
    ServicioEliminarProducto,
    ServicioModificarProducto,
    ManejadorRegistrarProducto,
    ManejadorListarProducto,
    ManejadorObtenerProducto,
    ManejadorEliminarProducto,
    ManejadorModificarProducto,
    RepositorioProducto,
    DaoProducto,
  ],
})
export class ProductoProveedorModule {

}
