import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Channel } from './channel.entity';
import { ChatSettingsCondition } from './chatSettingsCondition.entity';

@Entity()
export class ChatSettingsRule extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  isActivate: boolean;

  @Column()
  result: string;

  @OneToMany(() => ChatSettingsCondition, condition => condition.rule)
  @JoinColumn([
    { name: "condition_id", referencedColumnName: "id" },
  ])
  condition: ChatSettingsCondition;

  @ManyToOne(() => Channel, channel => channel.operators)
  @JoinColumn([
    { name: "channel_id", referencedColumnName: "id" },
  ])
  channel: Channel;
}