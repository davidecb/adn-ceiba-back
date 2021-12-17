import { daoProductoProvider } from "./../../producto/proveedor/dao/dao-producto.proveedor";
import { ManejadorRegistrarProductoSolicitado } from "src/aplicacion/producto-solicitado/comando/registar-producto-solicitado.manejador";
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
import { ProductoSolicitadoModule } from 'src/infraestructura/producto-solicitado/producto-solicitado.module';
import { ProductosPorPedidoModule } from 'src/infraestructura/productos-por-pedido/productos-por-pedido.module';
import { repositorioProductoSolicitadoProvider } from 'src/infraestructura/producto-solicitado/proveedor/repositorio/repositorio-producto-solicitado.proveedor';
import { repositorioProductosPorPedidoProvider } from 'src/infraestructura/productos-por-pedido/proveedor/repositorio/repositorio-productos-por-pedido.proveedor';
import { ManejadorRegistrarProductosPorPedido } from "src/aplicacion/productos-por-pedido/comando/registar-productos-por-pedido.manejador";
import { ProductoModule } from "src/infraestructura/producto/producto.module";
import { ManejadorObtenerProducto } from "src/aplicacion/producto/consulta/obtener-producto.manejador";

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntidad]),
    ProductoSolicitadoModule,
    ProductosPorPedidoModule,
    ProductoModule,    
  ],
  providers: [
    { provide: ServicioRegistrarPedido, inject: [RepositorioPedido], useFactory: servicioRegistrarPedidoProveedor },
    { provide: ServicioModificarPedido, inject: [RepositorioPedido], useFactory: servicioModificarPedidoProveedor },
    { provide: ServicioEliminarPedido, inject: [RepositorioPedido], useFactory: servicioEliminarPedidoProveedor },
    repositorioPedidoProvider,
    daoPedidoProvider,
    /* repositorioProductoSolicitadoProvider,
    repositorioProductosPorPedidoProvider,
    daoProductoProvider, */
    ManejadorRegistrarPedido,
    ManejadorListarPedido,
    ManejadorObtenerPedido,
    ManejadorModificarPedido,
    ManejadorEliminarPedido,
    /* ManejadorRegistrarProductoSolicitado,
    ManejadorObtenerProducto,
    ManejadorRegistrarProductosPorPedido, */
  ],
  exports: [
    ServicioRegistrarPedido,
    ServicioRegistrarPedido,
    ServicioModificarPedido,
    ServicioEliminarPedido,
    ManejadorRegistrarPedido,
    ManejadorListarPedido,
    ManejadorObtenerPedido,
    ManejadorModificarPedido,
    ManejadorEliminarPedido,
    RepositorioPedido,
    DaoPedido,
  ],
})
export class PedidoProveedorModule {

}
