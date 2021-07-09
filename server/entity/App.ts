import { Entity, CreateDateColumn, UpdateDateColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { AppCommand } from './AppCommand';

@Entity()
export class App extends BaseEntity {
  @Column({ primary: true, unique: true })
  id!: string;

  @Column({ unique: true, name: 'name' })
  name!: string;

  @Column({ nullable: true })
  url!: string;

  @Column({ name: 'root_dir', nullable: true })
  rootDir!: string;

  @OneToMany(() => AppCommand, (cmd) => cmd.app)
  commands: AppCommand[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
