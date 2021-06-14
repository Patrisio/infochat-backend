import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChatSettingsDto } from './dto/chat-settings.dto';


@Controller('channels')
export class ChannelsController {
  constructor(
    private channelsService: ChannelsService
  ) {}

  @Post('/project/:projectId/saveChatSettings')
  saveChatSettings(
    @Param('projectId') projectId,
    @Body() settingsDto: ChatSettingsDto,
  ) {
    return this.channelsService.saveChatSettings(settingsDto, projectId);
  }

  @Get('/project/:projectId/getChatSettings')
  getChatSettings(
    @Param('projectId') projectId,
  ) {
    return this.channelsService.getChatSettings(projectId);
  }
}
