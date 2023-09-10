import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12, unique: true })
  phone_number: string;

  @Column({ length: 30 })
  first_name: string;

  @Column({ length: 30 })
  last_name: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 5);
  }

  // @ManyToOne(() => CabinetRoleEntity, (role) => role.users)
  // @JoinColumn({ name: 'role_id' })
  // role: CabinetRoleEntity;
  //
  // @OneToMany(() => CabinetActionsEntity, (actions) => actions.user)
  // actions: CabinetActionsEntity;
}
