import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Client } from '../entities/client.entity';
import { cloneDeep } from 'lodash';
import { MessageStatusDto } from './dto/message-status.dto';
import { ClientDataDto } from './dto/client-data.dto';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async findDuplicateByClientId(clientId) {
    return await this.findOne({ id: clientId });
  }

  async getClientInfo(projectId, clientId) {
    const client = await this.findOne({ project: projectId, id: clientId });

    if (client) {
      return {
        assignedTo: client.assignedTo,
      };
    }
  }

  async getMessagesHistoryByProjectId(projectId) {
    const data = await getConnection()
      .query(`
        SELECT client.id, client."assignedTo", "messagesStatus", "avatarName", "avatarColor", messages_history.client_id, messages_history.message, messages_history.username,  messages_history.timestamp 
        FROM client
        JOIN messages_history ON client.id = messages_history.client_id
        WHERE project_id = $1
      `, [projectId]);
      console.log(data);
    const clients = data.reduce((acc, client) => {
      const foundClient = acc.find((c) => c.clientId === client.id);

      if (foundClient) {
        foundClient.messagesHistory.push({
          message: client.message,
          timestamp: Date.parse(client.timestamp),
          username: client.username,
        });

        return acc;
      }

      acc.push({
        clientId: client.id,
        assignedTo: client.assignedTo,
        avatarName: client.avatarName,
        avatarColor: client.avatarColor,
        messagesStatus: client.messagesStatus,
        messagesHistory: [{
          message: client.message,
          timestamp: Date.parse(client.timestamp),
          username: client.username,
        }]
      });

      return acc;
    }, []);

    return clients;
  }

  async addClientData(messageDto) {
    const { clientId, projectId, avatarName, avatarColor } = messageDto;

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Client)
        .values({
          project: parseInt(projectId),
          avatarName,
          avatarColor,
          id: clientId,
          messagesStatus: 'unread',
        })
        .execute();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateMessagesStatusByClientId(projectId: number, clientId: string, messagesStatusDto: MessageStatusDto) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Client)
        .set(messagesStatusDto)
        .where("project_id = :project_id AND id = :clientId", {
          project_id: projectId,
          clientId
        })
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

  async updateClientData(projectId: number, clientId: string, clientDataDto: ClientDataDto) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Client)
        .set(clientDataDto)
        .where('project_id = :projectId AND id = :clientId', { projectId, clientId })
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
}