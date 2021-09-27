import { ChatSettingsRepository } from './chatSettings.repository';
import { ChatSettingsDto } from './dto/chat-settings.dto';
export declare class ChannelsService {
    private chatSettingsRepository;
    constructor(chatSettingsRepository: ChatSettingsRepository);
    saveChatSettings(chatSettingsDto: ChatSettingsDto, projectId: string): Promise<{
        code: number;
        status: string;
    }>;
    getChatSettings(projectId: string): Promise<any>;
}
