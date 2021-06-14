import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Project } from './projects.entity';
import { ChatSettings } from './chatSettings.entity';
import { ChatSettingsOperator } from './chatSettingsOperator.entity';
import { ChatSettingsBusinessDays } from './chatSettingsBusinessDays.entity';

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string

  @ManyToOne(() => Project, project => project.channels)
  @JoinColumn([
    { name: "project_id", referencedColumnName: "id" },
  ])
  project: Project;

  @OneToOne(type => ChatSettings)
  @JoinColumn([
    { name: "chat_settings_id", referencedColumnName: "id" },
  ])
  chatSettingsId: number;

  @OneToMany(() => ChatSettingsOperator, chatSettingsOperator => chatSettingsOperator.channel)
  operators: ChatSettingsOperator[];

  @OneToMany(() => ChatSettingsBusinessDays, chatSettingsBusinessDays => chatSettingsBusinessDays.channel)
  businessDays: ChatSettingsBusinessDays[];
}