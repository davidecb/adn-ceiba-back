import { Module } from '@nestjs/common';
import { ProductoSolicitadoControlador } from './controlador/producto-solicitado.controlador';
import { ProductoSolicitadoProveedorModule } from './proveedor/producto-solicitado-proveedor.module';

@Module({
  imports: [
    ProductoSolicitadoProveedorModule
  ],
  controllers: [ProductoSolicitadoControlador],
})
export class ProductoSolicitadoModule {}
