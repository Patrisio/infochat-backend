import { BaseEntity } from 'typeorm';
import { Channel } from './channel.entity';
export declare class ChatSettingsOperator extends BaseEntity {
    id: number;
    name: string;
    email: string;
    channel: Channel;
}
