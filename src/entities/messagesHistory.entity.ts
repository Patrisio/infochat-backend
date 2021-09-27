import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

interface IMessagesHistory {
  clientId: string,
  username: string,
  message: string
}

@Entity()
export class MessagesHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  message: string

  @Column()
  username: string

  @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
  timestamp: Date

  @ManyToOne(() => Client, client => client.messages_history, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: "client_id", referencedColumnName: "id" },
  ])
  client: Client;
}