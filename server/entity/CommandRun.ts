import { Entity, CreateDateColumn, UpdateDateColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { AppCommand } from './AppCommand';

@Entity()
export class CommandRun extends BaseEntity {
  @Column({ primary: true, unique: true })
  id!: string;

  @ManyToOne(() => AppCommand, {})
  @JoinColumn({ name: 'command' })
  command: AppCommand;

  @Column()
  status!: string;

  @Column({ nullable: true })
  success!: boolean;

  @Column({ type: 'text', nullable: true })
  output!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
