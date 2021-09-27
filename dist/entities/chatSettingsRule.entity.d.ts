import { BaseEntity } from 'typeorm';
import { Channel } from './channel.entity';
import { ChatSettingsCondition } from './chatSettingsCondition.entity';
export declare class ChatSettingsRule extends BaseEntity {
    id: string;
    name: string;
    isActivate: boolean;
    result: string;
    condition: ChatSettingsCondition;
    channel: Channel;
}
