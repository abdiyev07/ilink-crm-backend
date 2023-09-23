import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  fixed_at: Date;

  @Column({ length: 12 })
  contact_phone_number: string;

  @Column({ nullable: true, default: null })
  activation_at: Date;

  @Column({ type: 'varchar' })
  work_type: string;

  @Column({ type: 'text', nullable: true })
  breakdown_reason: string;

  @Column({ type: 'boolean', default: true })
  is_free: boolean;

  @Column({ type: 'varchar' })
  client_type: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  csi: string;

  @Column({ type: 'text', nullable: true })
  executors: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  client_uid: string;

  @Column({ type: 'varchar', nullable: true })
  sub_provider: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
