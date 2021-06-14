import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Tariff } from '../entities/tariff.entity';
import { TariffPlanDto } from './dto/tariffPlan.dto';

@EntityRepository(Tariff)
export class TariffRepository extends Repository<Tariff> {
  async getTariffPlanByProjectId(projectId: number) {
    try {
      const {
        operatorsCount,
        chatCount,
        templatesCount,
        infochatLinkCount
      } = await Tariff.findOne({ project: projectId });

      const formattedTariffPlan = [
        {
          id: 'operators',
          count: operatorsCount,
        },
        {
          id: 'infochatLink',
          count: infochatLinkCount,
        },
        {
          id: 'templates',
          count: templatesCount,
        },
        {
          id: 'chat',
          count: chatCount,
        },
      ];

      return {
        code: 200,
        tariffPlan: formattedTariffPlan,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateTariffPlanByProjectId(projectId: number, tariffPlanDto: TariffPlanDto) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Tariff)
        .set(tariffPlanDto)
        .where('project_id = :projectId', { projectId })
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