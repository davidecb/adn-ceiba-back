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

import { ManejadorListarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/listar-productos-por-pedido.manejador';

@Module({
  imports: [TypeOrmModule.forFeature([ProductosPorPedidoEntidad])],
  providers: [
    { provide: ServicioRegistrarProductosPorPedido, inject: [RepositorioProductosPorPedido], useFactory: servicioRegistrarProductosPorPedidoProveedor },
    repositorioProductosPorPedidoProvider,
    daoProductosPorPedidoProvider,
    ManejadorRegistrarProductosPorPedido,
    ManejadorListarProductosPorPedido,
  ],
  exports: [
    ServicioRegistrarProductosPorPedido,
    ManejadorRegistrarProductosPorPedido,
    ManejadorListarProductosPorPedido,
    RepositorioProductosPorPedido,
    DaoProductosPorPedido,
  ],
})
export class ProductosPorPedidoProveedorModule {

}
