import { BaseEntity } from 'typeorm';
import { Channel } from './channel.entity';
export declare class ChatSettingsBusinessDays extends BaseEntity {
    id: number;
    weekday: string;
    timeFrom: string;
    timeTo: string;
    businessDayId: string;
    channel: Channel;
}
