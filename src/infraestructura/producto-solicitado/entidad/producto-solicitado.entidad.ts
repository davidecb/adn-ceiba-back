import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { ProductoEntidad } from 'src/infraestructura/producto/entidad/producto.entidad';

@Entity({ name: 'producto_solicitado' })
export class ProductoSolicitadoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ProductoEntidad, producto => producto.id, { 
    onDelete: 'CASCADE',
    eager: true })
  @JoinColumn({ name: 'producto_id' })
  producto: ProductoEntidad;

  @Column({ type: 'varchar', nullable: false })
  material: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'jsonb',nullable: false })
  acabado: object;

  @Column({ type: 'boolean', nullable: false })
  urgencia: boolean;

  @Column({ type: 'integer', nullable: false })
  costo: number;

  @Column({ type: 'real', nullable: false })
  tiempo: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
