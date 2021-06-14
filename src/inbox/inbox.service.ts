import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHistoryRepository } from './messagesHistory.repository';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../auth/user.repository';
import { ClientRepository } from './client.repository';
import { MessageDto } from './dto/message.dto';
import { ClientDto } from './dto/client.dto';
import { ClientInfoDto } from './dto/client-info.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';
import { MessageStatusDto } from './dto/message-status.dto';

@Injectable()
export class InboxService {
  constructor(
    @InjectRepository(MessagesHistoryRepository)
    private messagesHistoryRepository: MessagesHistoryRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository
  ) {}

  async addMessage(messageDto: MessageDto) {
    const { clientId, projectId, message, avatarName, avatarColor } = messageDto;
    const historyMessage = await this.clientRepository.findDuplicateByClientId(clientId);

    if (historyMessage) {
      await this.messagesHistoryRepository.addMessage(message, clientId);
    } else {
      await this.clientRepository.addClientData(messageDto);
      await this.messagesHistoryRepository.addMessage(message, clientId);
    }

    return {
      code: 200,
      status: 'success'
    };
  }

  async updateMessagesStatusByClientId(projectId: number, clientId: string, messagesStatusDto: MessageStatusDto) {
    return await this.clientRepository.updateMessagesStatusByClientId(projectId, clientId, messagesStatusDto);
  }

  async getMessagesHistory(clientDto) {
    return this.messagesHistoryRepository.getMessagesHistory(clientDto);
  }

  async getMessagesHistoryByProjectId(projectId) {
    return this.clientRepository.getMessagesHistoryByProjectId(projectId);
  }

  async getClientInfo(projectId: number, clientId: string) {
    return this.clientRepository.getClientInfo(projectId, clientId);
  }

  async update(projectId: number, clientId: string, assigned_to: ClientDataDto) {
    return this.clientRepository.updateClientData(projectId, clientId, assigned_to);
  }

  async addChannel(channel: ChannelDto, projectId: number) {
    return this.channelRepository.add(channel, projectId);
  }

  async getChannels(projectId: number) {
    return this.channelRepository.getChannels(projectId);
  }
}
