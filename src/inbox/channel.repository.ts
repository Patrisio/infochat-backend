import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection, QueryRunner } from 'typeorm';
import { Channel } from './channel.entity';
import { ChannelDto } from './dto/channel.dto';

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  async add(channel: ChannelDto, projectId: number) {
    const { name } = channel;

    try {
      await getConnection()
        .query('INSERT INTO channel (project_id, name, status) VALUES ($1, $2, $3)', [projectId, name, 'pending']);

        // const res = await getConnection()
        //   .query(`
        //     SELECT project.name AS "projectName", channel.name AS "channelName" FROM channel
        //     JOIN project ON channel.project_id = project.id
        //   `);

        // console.log(res);
        
      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getChannels(projectId: number) {
    try {
      const channels = await getConnection()
        .createQueryBuilder()
        .select('name, status')
        .from(Channel, 'channel')
        .where('project_id = :projectId', { projectId })
        .execute();

      return {
        code: 200,
        channels,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}