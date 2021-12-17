import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'producto' })
export class ProductoEntidad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  nombre: string;

  @Column({ type: 'integer', nullable: false })
  costo: number;

  @Column({ type: 'integer', nullable: false })
  tiempo: number;

  @Column({ type: 'varchar', nullable: false })
  imagen: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
