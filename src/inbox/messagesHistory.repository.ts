import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { MessagesHistory } from './messagesHistory.entity';
import { MessageDto } from './dto/message.dto';
import { ClientDto } from './dto/client.dto';
import { ClientInfoDto } from './dto/client-info.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { v4 as uuidv4 } from 'uuid';

@EntityRepository(MessagesHistory)
export class MessagesHistoryRepository extends Repository<MessagesHistory> {
  async addMessage(messageDto: MessageDto) {
    const { clientId, projectId, message, avatarName, avatarColor } = messageDto;
    const historyMessage = await this.findDuplicateByClientId(clientId);

    if (historyMessage) {
      try {
        await getConnection()
          .createQueryBuilder()
          .update(MessagesHistory) 
          .set({ messagesHistory: [...historyMessage.messagesHistory, message] })
          .where("clientId = :clientId", { clientId })
          .execute();

        return {
          code: 200,
          status: 'success'
        };
      } catch (error) {
        throw new InternalServerErrorException();
      }
    } else {
      const messagesHistoryInstance = new MessagesHistory();
    
      messagesHistoryInstance.clientId = clientId;
      messagesHistoryInstance.projectId = parseInt(projectId);
      messagesHistoryInstance.messagesHistory = [message];
      messagesHistoryInstance.avatarName = avatarName;
      messagesHistoryInstance.avatarColor = avatarColor;
  
      try {
        await messagesHistoryInstance.save();
        return {
          code: 200,
          status: 'success'
        };
      } catch (error) {
        console.log(error);

        throw new InternalServerErrorException();
      }
    }
  }

  async getMessagesHistory(clientDto) {
    const messagesHistory = await this.findOne(clientDto);

    if (messagesHistory) {
      return messagesHistory;
    }

    return {
      id: null,
      clientId: '',
      projectId: '',
      messagesHistory: []
    };
  }

  async findDuplicateByClientId(clientId) {
    return await this.findOne({ clientId });
  }

  async getMessagesHistoryByProjectId(projectId) {
    return await this.find({ projectId });
  }

  async getMessagesHistoryByProjectIdAndClientId(projectId, clientId) {
    return await this.findOne({ projectId, clientId });
  }

  async updateAssignedUserByClientId(assignedDto): Promise<{ code: number; status: string; }> {
    const { clientId, username } = assignedDto;

    try {
      await getConnection()         
        .createQueryBuilder()
        .update(MessagesHistory) 
        .set({ assigned_to: username })
        .where("clientId = :clientId", { clientId })
        .execute();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getClientInfo(projectId: number, clientId: string) {
    const client = await this.findOne({ projectId, clientId });

    return {
      assignedTo: client.assigned_to,
    };
  }

  async updateClientData(projectId: number, clientId: string, clientDataDto: ClientDataDto) {
    const historyMessage = await this.getMessagesHistoryByProjectIdAndClientId(projectId, clientId);
    const { assigned_to, avatarName, email, phone } = clientDataDto;
    
    historyMessage.assigned_to = assigned_to;
    historyMessage.avatarName = avatarName;
    historyMessage.email = email;
    historyMessage.phone = phone;

    try {
      await historyMessage.save();
      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
}