import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChangesHistory } from '../entities/changesHistory.entity';
import { Client } from '../entities/client.entity';

@EntityRepository(ChangesHistory)
export class ChangesHistoryRepository extends Repository<ChangesHistory> {
  async getChangesHistory(clientId: string) {
    try {
      const changesHistory = await getConnection()
        .createQueryBuilder()
        .select('before, after, "changeInFieldValue", timestamp')
        .from(ChangesHistory, 'changesHistory')
        .where('client_id = :clientId', { clientId })
        .execute();

      for (let i = 0; i < changesHistory.length; i++) {
        const changesHistoryItem = changesHistory[i];
        changesHistoryItem.timestamp = Date.parse(changesHistoryItem.timestamp);
      }

      return changesHistory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async addChanges(projectId, clientId, clientDataDto) {
    const { updatedBy } = clientDataDto;

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
    const changeInFieldValue = clientDataDto.changeInFieldValue;

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
            changeInFieldValue,
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

    if (updatedBy === 'client') return;
    if (updatedBy === 'operator') {
      if (!isEqual(newEmail, email)) {
        console.log(111);
        await insertNewChange(email, newEmail);
      }
  
      if (!isEqual(newPhone, phone)) {
        console.log(222);
        await insertNewChange(phone, newPhone);
      }
  
      if (!isEqual(newAvatarName, avatarName)) {
        console.log(333);
        await insertNewChange(avatarName, newAvatarName);
      }
    }
  }
}