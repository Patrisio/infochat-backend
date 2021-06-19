import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  madeBy: string;

  @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
  timestamp: Date

  @ManyToOne(() => Client, client => client.note)
  @JoinColumn([
    { name: "client_id", referencedColumnName: "id" },
  ])
  client: string;
}