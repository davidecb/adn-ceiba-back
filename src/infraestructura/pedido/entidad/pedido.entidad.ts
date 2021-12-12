import { ProductoEntidad } from '../../producto/entidad/producto.entidad';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({ name: 'pedido' })
export class PedidoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  numeroPedido: string;

  @OneToOne((type) => ProductoEntidad, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'producto' })
  producto: ProductoEntidad;

  @Column({ type: 'varchar', default: "PLA" })
  material: string;

  @Column({ type: 'varchar', default: "blanco" })
  color: string;

  @Column({ type: 'integer', default: 1 })
  cantidad: number;

  @Column({ type: 'boolean', default: false })
  pulido: boolean;

  @Column({ type: 'boolean', default: false })
  pintado: boolean;

  @Column({ type: 'boolean', default: false })
  barnizado: boolean;

  @Column({ type: 'boolean', default: false })
  urgente: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
