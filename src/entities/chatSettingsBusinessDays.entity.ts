import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class ChatSettingsBusinessDays extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekday: string;

  @Column()
  timeFrom: string;

  @Column()
  timeTo: string;

  @Column()
  businessDayId: string;

  @ManyToOne(() => Channel, channel => channel.businessDays)
  @JoinColumn([
    { name: "channel_id", referencedColumnName: "id" },
  ])
  channel: Channel;
}