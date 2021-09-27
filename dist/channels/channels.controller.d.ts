import { ChannelsService } from './channels.service';
import { ChatSettingsDto } from './dto/chat-settings.dto';
export declare class ChannelsController {
    private channelsService;
    constructor(channelsService: ChannelsService);
    saveChatSettings(projectId: any, settingsDto: ChatSettingsDto): Promise<{
        code: number;
        status: string;
    }>;
    getChatSettings(projectId: any): Promise<any>;
}
