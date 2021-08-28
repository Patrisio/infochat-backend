import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import { MessagesHistory } from './messagesHistory.entity';
import { Project } from './projects.entity';
import { ChangesHistory } from './changesHistory.entity';
import { Note } from './note.entity';

type MessagesStatus = 'unread' | 'assigned' | 'opened' | 'closed';

@Entity()
export class Client extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  assignedTo: string;

  @Column()
  avatarName: string;

  @Column()
  avatarColor: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  messagesStatus: MessagesStatus;

  @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => Project, project => project.client)
  @JoinColumn([
    { name: "project_id", referencedColumnName: "id" },
  ])
  project: number;

  @OneToMany(() => MessagesHistory, messagesHistory => messagesHistory.client)
  messages_history: MessagesHistory[];

  @OneToMany(() => ChangesHistory, changesHistory => changesHistory.client)
  changesHistory: ChangesHistory[];

  @OneToMany(() =>  Note, note => note.client)
  note: Note[];
}