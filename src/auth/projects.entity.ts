import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Channel } from '../inbox/channel.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Channel, channel => channel.project)
  channels: Channel[];

  @ManyToMany(type => User, user => user.projects)
  @JoinTable()
  users: User[];
}