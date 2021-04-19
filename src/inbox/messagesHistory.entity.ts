import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

interface IMessagesHistory {
  clientId: string,
  username: string,
  message: string
}

@Entity()
export class MessagesHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  projectId: number

  @Column()
  clientId: string

  @Column('jsonb')
  messagesHistory: IMessagesHistory[]

  @Column({ nullable: true })
  assigned_to: string

  @Column()
  avatarName: string

  @Column()
  avatarColor: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  email: string
}