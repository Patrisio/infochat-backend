import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { MessagesHistory } from '../entities/messagesHistory.entity';

@EntityRepository(MessagesHistory)
export class MessagesHistoryRepository extends Repository<MessagesHistory> {
  async getMessagesHistory(clientDto) {
    const data = await getConnection()
      .query(`
        SELECT client.id, client."assignedTo", "avatarName", "avatarColor", messages_history.client_id, messages_history.message, messages_history.username 
        FROM client
        JOIN messages_history ON client.id = messages_history.client_id
        WHERE project_id = $1 AND client.id = $2
      `, [clientDto.projectId, clientDto.clientId]);

    return {
      id: null,
      clientId: '',
      projectId: '',
      messagesHistory: data
    };
  }

  async addMessage(newMessage, clientId) {
    const { message, timestamp, username } = newMessage;
    console.log(newMessage, 'newMessage');

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(MessagesHistory)
        .values({
          message,
          username,
          client: clientId
        })
        .execute();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}