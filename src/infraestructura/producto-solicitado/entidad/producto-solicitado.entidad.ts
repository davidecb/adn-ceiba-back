import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductoEntidad } from 'src/infraestructura/producto/entidad/producto.entidad';

@Entity({ name: 'producto_solicitado' })
export class ProductoSolicitadoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => ProductoEntidad, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'producto' })
  producto: ProductoEntidad;

  @Column({ type: 'varchar', nullable: false })
  material: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'jsonb',nullable: false })
  acabado: object;

  @Column({ type: 'boolean', nullable: false })
  urgencia: boolean;

  @Column({ type: 'real', nullable: false })
  costo: number;

  @Column({ type: 'integer', nullable: false })
  tiempo: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
