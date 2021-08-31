import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class ChangesHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  before: string;

  @Column()
  after: string;

  @Column()
  changeInFieldValue: string;

  @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
  timestamp: Date

  @ManyToOne(() => Client, client => client.changesHistory, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: "client_id", referencedColumnName: "id" },
  ])
  client: string;
}