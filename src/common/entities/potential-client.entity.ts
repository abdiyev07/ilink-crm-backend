import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('potential_clients')
export class PotentialClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  processed_employee_name: string;

  @Column({ type: 'varchar' })
  tariff_name: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'boolean' })
  has_tv: boolean;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
