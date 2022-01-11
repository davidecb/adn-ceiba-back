import { repositorioProductoSolicitadoProvider } from "./../../producto-solicitado/proveedor/repositorio/repositorio-producto-solicitado.proveedor";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { repositorioProductosPorPedidoProvider } from './repositorio/repositorio-productos-por-pedido.proveedor';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';

import { daoProductosPorPedidoProvider } from './dao/dao-productos-por-pedido.proveedor';
import { DaoProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/dao/dao-productos-por-pedido';
import { ProductosPorPedidoEntidad } from '../entidad/productos-por-pedido.entidad';

import { servicioRegistrarProductosPorPedidoProveedor } from './servicio/servicio-registrar-productos-por-pedido.proveedor';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';
import { ManejadorRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registar-productos-por-pedido.manejador';

import { servicioModificarProductosPorPedidoProveedor } from './servicio/servicio-modificar-productos-por-pedido.proveedor';
import { ServicioModificarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-modificar-productos-por-pedido';
import { ManejadorModificarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/modificar-productos-por-pedido.manejador';

import { servicioEliminarProductosPorPedidoProveedor } from './servicio/servicio-eliminar-productos-por-pedido.proveedor';
import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';
import { ManejadorEliminarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/eliminar-productos-por-pedido.manejador';

import { ManejadorListarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/listar-productos-por-pedido.manejador';
import { ManejadorObtenerProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/obtener-producto-por-pedido.manejador';
import { PedidoModule } from "src/infraestructura/pedido/pedido.module";
import { repositorioPedidoProvider } from "./../../pedido/proveedor/repositorio/repositorio-pedido.proveedor";
import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { PedidoEntidad } from 'src/infraestructura/pedido/entidad/pedido.entidad';
import { ProductoSolicitadoEntidad } from "src/infraestructura/producto-solicitado/entidad/producto-solicitado.entidad";

@Module({
  imports: [TypeOrmModule.forFeature([ProductosPorPedidoEntidad, PedidoEntidad, ProductoSolicitadoEntidad]), PedidoModule],
  providers: [
    { provide: ServicioRegistrarProductosPorPedido, inject: [RepositorioProductosPorPedido, RepositorioPedido], useFactory: servicioRegistrarProductosPorPedidoProveedor },
    { provide: ServicioModificarProductosPorPedido, inject: [RepositorioProductosPorPedido], useFactory: servicioModificarProductosPorPedidoProveedor },
    { provide: ServicioEliminarProductosPorPedido, inject: [RepositorioProductosPorPedido, RepositorioPedido], useFactory: servicioEliminarProductosPorPedidoProveedor },
    repositorioProductosPorPedidoProvider,
    repositorioPedidoProvider,
    daoProductosPorPedidoProvider,
    repositorioProductoSolicitadoProvider,
    ManejadorRegistrarProductosPorPedido,
    ManejadorModificarProductosPorPedido,
    ManejadorEliminarProductosPorPedido,
    ManejadorListarProductosPorPedido,
    ManejadorObtenerProductosPorPedido,
  ],
  exports: [
    ServicioRegistrarProductosPorPedido,
    ServicioModificarProductosPorPedido,
    ServicioEliminarProductosPorPedido,
    ManejadorRegistrarProductosPorPedido,
    ManejadorModificarProductosPorPedido,
    ManejadorEliminarProductosPorPedido,
    ManejadorListarProductosPorPedido,
    ManejadorObtenerProductosPorPedido,
    RepositorioProductosPorPedido,
    DaoProductosPorPedido,
  ],
})
export class ProductosPorPedidoProveedorModule {

}
