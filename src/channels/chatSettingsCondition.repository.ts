import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChatSettingsCondition } from '../entities/chatSettingsCondition.entity';

@EntityRepository(ChatSettingsCondition)
export class ChatSettingsConditionRepository extends Repository<ChatSettingsCondition> {
  
}