import { Module } from '@nestjs/common';
import { ProductosPorPedidoControlador } from './controlador/productos-por-pedido.controlador';
import { ProductosPorPedidoProveedorModule } from './proveedor/productos-por-pedido-proveedor.module';

@Module({
  imports: [
    ProductosPorPedidoProveedorModule
  ],
  controllers: [ProductosPorPedidoControlador],
})
export class ProductosPorPedidoModule {}
