import { PedidoEntidad } from "./../../pedido/entidad/pedido.entidad";
import { ProductoSolicitadoEntidad } from "./../../producto-solicitado/entidad/producto-solicitado.entidad";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'productos_por_pedido' })
export class ProductosPorPedidoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => PedidoEntidad, pedido => pedido.productosSolicitados)
  @JoinColumn({ name: 'pedido' })
  pedido: PedidoEntidad;

  @OneToOne(() => ProductoSolicitadoEntidad, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'producto_solicitado_id' })
  productoSolicitado: ProductoSolicitadoEntidad;

  @Column({ type: 'integer', nullable: false })
  cantidad: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
