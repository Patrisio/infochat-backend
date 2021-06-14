import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChatSettingsOperator } from '../entities/chatSettingsOperator.entity';

@EntityRepository(ChatSettingsOperator)
export class ChatSettingsOperatorRepository extends Repository<ChatSettingsOperator> {
  
}