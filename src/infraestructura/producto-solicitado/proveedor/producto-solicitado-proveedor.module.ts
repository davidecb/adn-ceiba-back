import { repositorioProductoProvider } from "./../../producto/proveedor/repositorio/repositorio-producto.proveedor";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import { ManejadorObtenerProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/obtener-producto-solicitado.manejador';
import { ManejadorListarProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/listar-productos-solicitados.manejador';

import { ProductoModule } from 'src/infraestructura/producto/producto.module';
import { ProductoEntidad } from "src/infraestructura/producto/entidad/producto.entidad";

@Module({
  imports: [TypeOrmModule.forFeature([ProductoSolicitadoEntidad, ProductoEntidad]), ProductoModule],
  providers: [
    { provide: ServicioRegistrarProductoSolicitado, inject: [RepositorioProductoSolicitado], useFactory: servicioRegistrarProductoSolicitadoProveedor },
    { provide: ServicioEliminarProductoSolicitado, inject: [RepositorioProductoSolicitado], useFactory: servicioEliminarProductoSolicitadoProveedor },
    repositorioProductoSolicitadoProvider,
    daoProductoSolicitadoProvider,
    repositorioProductoProvider,
    ManejadorRegistrarProductoSolicitado,
    ManejadorListarProductoSolicitado,
    ManejadorObtenerProductoSolicitado,
    ManejadorEliminarProductoSolicitado,
  ],
  exports: [
    ServicioRegistrarProductoSolicitado,
    ServicioEliminarProductoSolicitado,
    ManejadorRegistrarProductoSolicitado,
    ManejadorListarProductoSolicitado,
    ManejadorObtenerProductoSolicitado,
    ManejadorEliminarProductoSolicitado,
    RepositorioProductoSolicitado,
    DaoProductoSolicitado,
  ],
})
export class ProductoSolicitadoProveedorModule {

}
