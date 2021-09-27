import { BaseEntity } from 'typeorm';
import { ChatSettingsRule } from './chatSettingsRule.entity';
export declare class ChatSettingsCondition extends BaseEntity {
    id: number;
    variant: string;
    operator: string;
    value: string;
    rule: ChatSettingsRule;
}
