import { ProductosPorPedidoEntidad } from './../../productos-por-pedido/entidad/productos-por-pedido.entidad';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'pedido' })
export class PedidoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  numeroPedido: string;

  @OneToMany(() => ProductosPorPedidoEntidad, productoPorPedido => productoPorPedido.pedido, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true 
  })
  @JoinColumn({ name: 'producto' })
  productosSolicitados: ProductosPorPedidoEntidad[];

  @Column({ type: 'varchar', nullable: false })
  direccion: string;

  @Column({ type: 'varchar', nullable: false })
  cliente: string;

  @Column({ type: 'varchar', nullable: false })
  estado: string;

  @Column({ type: 'integer', default: 0 })
  costo: number;

  @Column({ type: 'real', default: 0 })
  tiempo: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
