import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatSettingsRepository } from './chatSettings.repository';
import { ChatSettingsDto } from './dto/chat-settings.dto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChatSettingsRepository)
    private chatSettingsRepository: ChatSettingsRepository,
  ) {}

  async saveChatSettings(chatSettingsDto: ChatSettingsDto, projectId: string) {
    return this.chatSettingsRepository.saveChatSettings(chatSettingsDto, projectId);
  }

  async getChatSettings(projectId: string) {
    return this.chatSettingsRepository.getChatSettings(projectId);
  }
}
