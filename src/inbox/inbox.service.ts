import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHistoryRepository } from './messagesHistory.repository';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../auth/user.repository';
import { MessageDto } from './dto/message.dto';
import { ClientDto } from './dto/client.dto';
import { ClientInfoDto } from './dto/client-info.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';

@Injectable()
export class InboxService {
  constructor(
    @InjectRepository(MessagesHistoryRepository)
    private messagesHistoryRepository: MessagesHistoryRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository
  ) {}

  async addMessage(messageDto: MessageDto): Promise<{code: number, status: string}> {
    return this.messagesHistoryRepository.addMessage(messageDto);
  }

  async getMessagesHistory(clientDto) {
    return this.messagesHistoryRepository.getMessagesHistory(clientDto);
  }

  async getMessagesHistoryByProjectId(projectId) {
    return this.messagesHistoryRepository.getMessagesHistoryByProjectId(projectId);
  }

  async updateAssignedUser(assignedDto, projectId) {
    const { unreadClientIds, unreadCount, openedClientIds, openedCount } = assignedDto;

    const messageHistoryResponse = await this.messagesHistoryRepository.updateAssignedUserByClientId(assignedDto);
    const userResponse = await this.userRepository.updateAssignedUserByEmail(assignedDto);
    const unreadResponse = await this.userRepository.updateDialogForAllTeammates(projectId, { unreadClientIds, unreadCount });
    const openedResponse = await this.userRepository.updateOpenedDialogForAllTeammates(projectId, { openedClientIds, openedCount });
    const closedResponse = await this.userRepository.updateClosedUserByEmail(assignedDto);

    if (
      messageHistoryResponse.code === 200 &&
      userResponse.code === 200 &&
      unreadResponse.code === 200 &&
      openedResponse.code === 200 &&
      closedResponse.code === 200) 
    {
      return {
        code: 200,
        status: 'success'
      };
    }
    
    throw new InternalServerErrorException();
  }

  async getClientInfo(projectId: number, clientId: string) {
    return this.messagesHistoryRepository.getClientInfo(projectId, clientId);
  }

  async update(projectId: number, clientId: string, assigned_to: ClientDataDto) {
    return this.messagesHistoryRepository.updateClientData(projectId, clientId, assigned_to);
  }

  async addChannel(channel: ChannelDto, projectId: number) {
    return this.channelRepository.add(channel, projectId);
  }

  async getChannels(projectId: number) {
    return this.channelRepository.getChannels(projectId);
  }
}
