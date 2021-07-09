import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { App } from './App';
import { CommandRun } from './CommandRun';

@Entity()
export class AppCommand extends BaseEntity {
  @Column({ primary: true, unique: true })
  id!: string;

  @ManyToOne(() => App, {})
  @JoinColumn({ name: 'app' })
  app: App;

  @OneToMany(() => CommandRun, (run) => run.command)
  runs: CommandRun[];

  @Column()
  name!: string;

  @Column()
  command!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
