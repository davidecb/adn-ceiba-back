import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { daoProductoProvider } from './../../producto/proveedor/dao/dao-producto.proveedor';
import { ManejadorObtenerProducto } from 'src/aplicacion/producto/consulta/obtener-producto.manejador';

import { repositorioProductoSolicitadoProvider } from './repositorio/repositorio-producto-solicitado.proveedor';
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';

import { daoProductoSolicitadoProvider } from './dao/dao-producto-solicitado.proveedor';
import { ProductoSolicitadoEntidad } from '../entidad/producto-solicitado.entidad';
import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';

import { servicioRegistrarProductoSolicitadoProveedor } from './servicio/servicio-registrar-producto-solicitado.proveedor';
import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';
import { ManejadorRegistrarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/registar-producto-solicitado.manejador';

import { servicioEliminarProductoSolicitadoProveedor } from './servicio/servicio-eliminar-producto-solicitado.proveedor';
import { ServicioEliminarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-eliminar-producto-solicitado';
import { ManejadorEliminarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/eliminar-producto-solicitado.manejador';

import { servicioModificarProductoSolicitadoProveedor } from './servicio/servicio-modificar-producto-solicitado.proveedor';
import { ServicioModificarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-modificar-producto-solicitado';
import { ManejadorModificarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/modificar-producto-solicitado.manejador';

import { ManejadorObtenerProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/obtener-producto-solicitado.manejador';
import { ManejadorListarProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/listar-productos-solicitados.manejador';

import { ProductoModule } from 'src/infraestructura/producto/producto.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoSolicitadoEntidad]), ProductoModule],
  providers: [
    { provide: ServicioRegistrarProductoSolicitado, inject: [RepositorioProductoSolicitado], useFactory: servicioRegistrarProductoSolicitadoProveedor },
    { provide: ServicioModificarProductoSolicitado, inject: [RepositorioProductoSolicitado, DaoProductoSolicitado], useFactory: servicioModificarProductoSolicitadoProveedor },
    { provide: ServicioEliminarProductoSolicitado, inject: [RepositorioProductoSolicitado], useFactory: servicioEliminarProductoSolicitadoProveedor },
    repositorioProductoSolicitadoProvider,
    daoProductoSolicitadoProvider,
    daoProductoProvider,
    ManejadorRegistrarProductoSolicitado,
    ManejadorListarProductoSolicitado,
    ManejadorObtenerProductoSolicitado,
    ManejadorModificarProductoSolicitado,
    ManejadorEliminarProductoSolicitado,
    ManejadorObtenerProducto,
  ],
  exports: [
    ServicioRegistrarProductoSolicitado,
    ServicioModificarProductoSolicitado,
    ServicioEliminarProductoSolicitado,
    ManejadorRegistrarProductoSolicitado,
    ManejadorListarProductoSolicitado,
    ManejadorObtenerProductoSolicitado,
    ManejadorModificarProductoSolicitado,
    ManejadorEliminarProductoSolicitado,
    RepositorioProductoSolicitado,
    DaoProductoSolicitado,
  ],
})
export class ProductoSolicitadoProveedorModule {

}
