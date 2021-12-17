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

@Module({
  imports: [TypeOrmModule.forFeature([ProductosPorPedidoEntidad])],
  providers: [
    { provide: ServicioRegistrarProductosPorPedido, inject: [RepositorioProductosPorPedido], useFactory: servicioRegistrarProductosPorPedidoProveedor },
    { provide: ServicioModificarProductosPorPedido, inject: [RepositorioProductosPorPedido], useFactory: servicioModificarProductosPorPedidoProveedor },
    { provide: ServicioEliminarProductosPorPedido, inject: [RepositorioProductosPorPedido], useFactory: servicioEliminarProductosPorPedidoProveedor },
    repositorioProductosPorPedidoProvider,
    daoProductosPorPedidoProvider,
    ManejadorRegistrarProductosPorPedido,
    ManejadorModificarProductosPorPedido,
    ManejadorEliminarProductosPorPedido,
    ManejadorListarProductosPorPedido,
    ManejadorObtenerProductosPorPedido,
  ],
  exports: [
    ServicioRegistrarProductosPorPedido,
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
