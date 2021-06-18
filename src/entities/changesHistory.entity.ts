import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class ChangesHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  before: string;

  @Column()
  after: string;

  @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
  timestamp: Date

  @ManyToOne(() => Client, client => client.changesHistory)
  @JoinColumn([
    { name: "client_id", referencedColumnName: "id" },
  ])
  client: string;
}