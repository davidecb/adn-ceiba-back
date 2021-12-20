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
import { ProductoSolicitadoModule } from 'src/infraestructura/producto-solicitado/producto-solicitado.module';
import { ProductosPorPedidoModule } from 'src/infraestructura/productos-por-pedido/productos-por-pedido.module';
import { ProductoModule } from 'src/infraestructura/producto/producto.module';
import { ManejadorObtenerPedidosPorEstado } from 'src/aplicacion/pedido/consulta/obtener-pedidos-por-estado.manejador';
import { ManejadorObtenerProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/obtener-producto-por-pedido.manejador';
import { ServicioRecalcularPedido } from 'src/dominio/pedido/servicio/servicio-recalcular-pedido';
import { servicioRecalcularPedidoProveedor } from './servicio/servicio-recalcular-pedido.proveedor';
import { ManejadorRecalcularPedido } from "src/aplicacion/pedido/comando/recalcular-pedido.manejador";

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
    { provide: ServicioRecalcularPedido, inject: [RepositorioPedido, DaoPedido], useFactory: servicioRecalcularPedidoProveedor },
    repositorioPedidoProvider,
    daoPedidoProvider,
    daoProductosPorPedidoProvider,
    ManejadorRegistrarPedido,
    ManejadorListarPedido,
    ManejadorObtenerPedido,
    ManejadorObtenerPedidosPorEstado,
    ManejadorModificarPedido,
    ManejadorRecalcularPedido,
    ManejadorEliminarPedido,
    ManejadorObtenerProductosPorPedido
  ],
  exports: [
    ServicioRegistrarPedido,
    ServicioRegistrarPedido,
    ServicioModificarPedido,
    ServicioEliminarPedido,
    ManejadorRegistrarPedido,
    ManejadorListarPedido,
    ManejadorObtenerPedido,
    ManejadorObtenerPedidosPorEstado,
    ManejadorModificarPedido,
    ManejadorRecalcularPedido,
    ManejadorEliminarPedido,
    RepositorioPedido,
    DaoPedido,
  ],
})
export class PedidoProveedorModule {

}
