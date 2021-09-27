import { Repository } from 'typeorm';
import { ChatSettings } from '../entities/chatSettings.entity';
import { ChatSettingsDto } from './dto/chat-settings.dto';
export declare class ChatSettingsRepository extends Repository<ChatSettings> {
    saveChatSettings(chatSettingsDto: ChatSettingsDto, projectId: string): Promise<{
        code: number;
        status: string;
    }>;
    insertRules(rules: any): Promise<void>;
    insertConditions(conditions: any): Promise<void>;
    insertBusinessDays(businessDays: any): Promise<void>;
    insertOperators(operators: any): Promise<void>;
    updateRules(channelId: number, rules: any): Promise<void>;
    updateBusinessDays(channelId: number, businessDays: any): Promise<void>;
    updateOperators(channelId: number, operators: any): Promise<void>;
    getChatSettings(projectId: string): Promise<any>;
}
