import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChatSettingsRule } from '../entities/chatSettingsRule.entity';

@EntityRepository(ChatSettingsRule)
export class ChatSettingsRuleRepository extends Repository<ChatSettingsRule> {
  
}