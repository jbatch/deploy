import { Entity, CreateDateColumn, UpdateDateColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ primary: true, unique: true })
  id!: string;

  @Column({ unique: true, name: 'user_name' })
  userName!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
