import { PedidoEntidad } from './../../pedido/entidad/pedido.entidad';
import { ProductoSolicitadoEntidad } from './../../producto-solicitado/entidad/producto-solicitado.entidad';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity({ name: 'productos_por_pedido' })
export class ProductosPorPedidoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @ManyToOne(() => PedidoEntidad, pedido => pedido.productosSolicitados, {
    onDelete: 'CASCADE'})
  @JoinColumn({ name: 'pedido' })  
  pedido: PedidoEntidad;

  @OneToOne(() => ProductoSolicitadoEntidad, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'producto' })
  productoSolicitado: ProductoSolicitadoEntidad;

  @Column({ type: 'integer', nullable: false })
  cantidad: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
