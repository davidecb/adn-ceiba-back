import { ProductosPorPedidoEntidad } from "./../../productos-por-pedido/entidad/productos-por-pedido.entidad";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable } from 'typeorm';

@Entity({ name: 'pedido' })
export class PedidoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  numeroPedido: string;

  @ManyToOne(() => ProductosPorPedidoEntidad, productoPorPedido => productoPorPedido.pedido, { eager: true })
  @JoinTable({ name: 'producto' })
  productosSolicitados: ProductosPorPedidoEntidad[];

  @Column({ type: 'varchar', nullable: false })
  direccion: string;

  @Column({ type: 'varchar', nullable: false })
  cliente: string;

  @Column({ type: 'real', nullable: false })
  costo: number;

  @Column({ type: 'integer', nullable: false })
  tiempo: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
