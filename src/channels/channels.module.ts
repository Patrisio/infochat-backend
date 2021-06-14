import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChatSettingsRepository } from './chatSettings.repository';
import { ChatSettingsOperatorRepository } from './chatSettingsOperator.repository';
import { ChatSettingsBusinessDaysRepository } from './chatSettingsBusinessDays.repository';
import { ChatSettingsConditionRepository } from './chatSettingsCondition.repository';
import { ChatSettingsRuleRepository } from './chatSettingsRule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsController } from './channels.controller';

@Module({
  providers: [ChannelsService],
  imports: [
    TypeOrmModule.forFeature([
      ChatSettingsRepository,
      ChatSettingsOperatorRepository,
      ChatSettingsBusinessDaysRepository,
      ChatSettingsRuleRepository,
      ChatSettingsConditionRepository
    ])
  ],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
