import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class ChatSettingsOperator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Channel, channel => channel.operators)
  @JoinColumn([
    { name: "channel_id", referencedColumnName: "id" },
  ])
  channel: Channel;
}