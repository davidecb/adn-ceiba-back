import { daoProductosPorPedidoProvider } from "./../../productos-por-pedido/proveedor/dao/dao-productos-por-pedido.proveedor";
import { Module } from '@nestjs/common';
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { servicioRegistrarPedidoProveedor } from './servicio/servicio-registrar-pedido.proveedor';
import { repositorioPedidoProvider } from './repositorio/repositorio-pedido.proveedor';
import { daoPedidoProvider } from './dao/dao-pedido.proveedor';
import { ManejadorRegistrarPedido } from 'src/aplicacion/pedido/comando/registar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedidos.manejador';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntidad } from '../entidad/pedido.entidad';
import { ServicioModificarPedido } from 'src/dominio/pedido/servicio/servicio-modificar-pedido';
import { ServicioEliminarPedido } from 'src/dominio/pedido/servicio/servicio-eliminar-pedido';
import { servicioEliminarPedidoProveedor } from './servicio/servicio-eliminar-pedido.proveedor';
import { servicioModificarPedidoProveedor } from './servicio/servicio-modificar-pedido.proveedor';
import { ManejadorObtenerPedido } from 'src/aplicacion/pedido/consulta/obtener-pedido.manejador';
import { ManejadorModificarPedido } from 'src/aplicacion/pedido/comando/modificar-pedido.manejador';
import { ManejadorEliminarPedido } from 'src/aplicacion/pedido/comando/eliminar-pedido.manejador';
import { ManejadorObtenerPedidosPorEstado } from 'src/aplicacion/pedido/consulta/obtener-pedidos-por-estado.manejador';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntidad])],
  providers: [
    { provide: ServicioRegistrarPedido, inject: [RepositorioPedido], useFactory: servicioRegistrarPedidoProveedor },
    { provide: ServicioModificarPedido, inject: [RepositorioPedido], useFactory: servicioModificarPedidoProveedor },
    { provide: ServicioEliminarPedido, inject: [RepositorioPedido], useFactory: servicioEliminarPedidoProveedor },
    repositorioPedidoProvider,
    daoPedidoProvider,
    ManejadorRegistrarPedido,
    ManejadorListarPedido,
    ManejadorObtenerPedido,
    ManejadorObtenerPedidosPorEstado,
    ManejadorModificarPedido,
    ManejadorEliminarPedido,
  ],
  exports: [
    ServicioRegistrarPedido,
    ServicioModificarPedido,
    ServicioEliminarPedido,
    ManejadorRegistrarPedido,
    ManejadorListarPedido,
    ManejadorObtenerPedido,
    ManejadorObtenerPedidosPorEstado,
    ManejadorModificarPedido,
    ManejadorEliminarPedido,
    RepositorioPedido,
    DaoPedido,
  ],
})
export class PedidoProveedorModule {

}
