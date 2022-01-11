import { Module } from '@nestjs/common';
import { ProductoSolicitadoControlador } from '../producto-solicitado/controlador/producto-solicitado.controlador';
import { ProductoSolicitadoProveedorModule } from '../producto-solicitado/proveedor/producto-solicitado-proveedor.module';
import { ProductoControlador } from '../producto/controlador/producto.controlador';
import { ProductoProveedorModule } from '../producto/proveedor/producto-proveedor.module';
import { ProductosPorPedidoControlador } from '../productos-por-pedido/controlador/productos-por-pedido.controlador';
import { ProductosPorPedidoProveedorModule } from '../productos-por-pedido/proveedor/productos-por-pedido-proveedor.module';
import { PedidoControlador } from './controlador/pedido.controlador';
import { PedidoProveedorModule } from './proveedor/pedido-proveedor.module';

@Module({
  imports: [
    PedidoProveedorModule/* ,
    ProductoSolicitadoProveedorModule,
    ProductosPorPedidoProveedorModule,
    ProductoProveedorModule */
  ],
  controllers: [
    PedidoControlador/* ,
    ProductoSolicitadoControlador,
    ProductosPorPedidoControlador,
    ProductoControlador */
  ],
})
export class PedidoModule {}
