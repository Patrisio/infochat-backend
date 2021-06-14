import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChatSettingsBusinessDays } from '../entities/chatSettingsBusinessDays.entity';

@EntityRepository(ChatSettingsBusinessDays)
export class ChatSettingsBusinessDaysRepository extends Repository<ChatSettingsBusinessDays> {
  
}