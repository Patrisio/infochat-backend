import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Channel } from './channel.entity';
import { Template } from './template.entity';
import { User } from './user.entity';
import { Client } from './client.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  timezone: string;

  @OneToMany(() => Channel, channel => channel.project)
  channels: Channel[];

  @OneToMany(() => Template, template => template.project)
  templates: Template[];

  @OneToMany(() => Client, client => client.project)
  client: Template[];

  @ManyToMany(type => User, user => user.projects)
  @JoinTable()
  users: User[];

  // @ManyToOne(() => User, user => user.project)
  // user: User;

  @OneToMany(() => Client, client => client.project)
  project: Project[];
}