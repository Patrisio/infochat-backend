import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHistoryRepository } from './messagesHistory.repository';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../auth/user.repository';
import { NoteRepository } from './note.repository';
import { ClientRepository } from './client.repository';
import { ChangesHistoryRepository } from './changesHistory.repository';
import { MessageDto } from './dto/message.dto';
import { ClientDto } from './dto/client.dto';
import { ClientInfoDto } from './dto/client-info.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';
import { MessageStatusDto } from './dto/message-status.dto';
import { NoteDataDto } from './dto/note-data.dto';

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
    private clientRepository: ClientRepository,
    @InjectRepository(ChangesHistoryRepository)
    private changesHistoryRepository: ChangesHistoryRepository,
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository
  ) {}

  async addMessage(messageDto: MessageDto) {
    const { clientId, message } = messageDto;
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
    try {
      const changesHistory = await this.changesHistoryRepository.getChangesHistory(clientId);
      const notes = await this.noteRepository.getNotes(clientId);
      return {
        changesHistory,
        notes,
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(projectId: number, clientId: string, clientDataDto: ClientDataDto) {
    try {
      await this.changesHistoryRepository.addChanges(projectId, clientId, clientDataDto);
      await this.clientRepository.updateClientData(projectId, clientId, clientDataDto);

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async addChannel(channel: ChannelDto, projectId: number) {
    return this.channelRepository.add(channel, projectId);
  }

  async getChannels(projectId: number) {
    return this.channelRepository.getChannels(projectId);
  }

  async addNote(clientId: string, noteDataDto: NoteDataDto) {
    return this.noteRepository.addNote(clientId, noteDataDto);
  }

  async deleteNote(noteId: number) {
    return this.noteRepository.deleteNote(noteId);
  }
}
