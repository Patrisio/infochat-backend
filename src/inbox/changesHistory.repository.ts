import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChangesHistory } from '../entities/changesHistory.entity';
import { Client } from '../entities/client.entity';

@EntityRepository(ChangesHistory)
export class ChangesHistoryRepository extends Repository<ChangesHistory> {
  async getMessagesHistory(clientDto) {
    // const data = await getConnection()
    //   .query(`
    //     SELECT client.id, client."assignedTo", "avatarName", "avatarColor", messages_history.client_id, messages_history.message, messages_history.username 
    //     FROM client
    //     JOIN messages_history ON client.id = messages_history.client_id
    //     WHERE project_id = $1 AND client.id = $2
    //   `, [clientDto.projectId, clientDto.clientId]);

    // return {
    //   id: null,
    //   clientId: '',
    //   projectId: '',
    //   messagesHistory: data
    // };
  }

  async addChanges(projectId, clientId, clientDataDto) {
    function isUndefined(value) {
      return value === undefined
    }

    function isEqual(firstValue, secondValue) {
      return firstValue === secondValue;
    }

    const { email, phone, avatarName } = await Client.findOne({ id: clientId, project: projectId });
    const newEmail = clientDataDto.email;
    const newPhone = clientDataDto.phone;
    const newAvatarName = clientDataDto.avatarName;

    const insertNewChange = async (oldFieldValue: string, newFieldValue: string) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(ChangesHistory)
          .values({
            before: oldFieldValue,
            after: newFieldValue,
            client: clientId,
          })
          .execute();
        
          return {
            statusCode: 200,
            status: 'success',
          };
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    };
    console.log(newEmail, email, !isEqual(newEmail, email));
    if (email && !isEqual(newEmail, email)) {
      console.log(111);
      await insertNewChange(email, newEmail);
    }

    if (phone && !isEqual(newPhone, phone)) {
      console.log(222);
      await insertNewChange(phone, newPhone);
    }

    if (newAvatarName && avatarName && !isEqual(newAvatarName, avatarName)) {
      console.log(333);
      await insertNewChange(avatarName, newAvatarName);
    }
  }
}