import { readFile } from 'fs';
import { resolve } from 'path';
import { Controller, Post, Body, Res, UseGuards, Param, Get, ValidationPipe, Req, Query, Patch, Put } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { AuthGuard } from '@nestjs/passport';
import { MessageDto } from './dto/message.dto';
import { AssignedDto } from './dto/assigned.dto';
import { ClientInfoDto } from './dto/client-info.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';

@Controller('inbox')
export class InboxController {
  constructor(
    private inboxService: InboxService
  ) {}

  @Get('/project/:projectId/chat/:clientId/getMessagesHistory')
  getMessagesHistory(
    @Param('projectId') projectId,
    @Param('clientId') clientId,
  ) {
    return this.inboxService.getMessagesHistory({ projectId, clientId });
  }

  @Get('/api/:projectId/widget')
  getWidgetScript(
    @Res() res,
    @Param('projectId') projectId
  ) {
    console.log('HEREx');
    readFile(
      resolve(__dirname, '..', '..', 'widgets', 'chat.js'),
      'utf8',
      function (err, data) {
        console.log(data, 'dddd');
        if (err) {
          return console.log(err);
        }
    
        const widgetScriptFile = data.replace(/project_id/g, projectId);
        console.log('DOWN');
        console.log(widgetScriptFile);
        res.send(widgetScriptFile);
      }
    );
  }

  @Get('/project/:projectId/getMessagesHistoryByProject')
  getMessagesHistoryByProjectId(@Param('projectId') projectId) {
    return this.inboxService.getMessagesHistoryByProjectId(projectId);
  }

  @Post('/addMessage')
  addMessage(@Body() messageDto: MessageDto) {
    return this.inboxService.addMessage(messageDto);
  }

  @Post('/project/:projectId/addChannel')
  addChannel(
    @Body() channel: ChannelDto,
    @Param('projectId') projectId
  ) {
    return this.inboxService.addChannel(channel, parseInt(projectId));
  }

  @Post('/project/:projectId/updateAssignedUser')
  updateAssignedUser(
    @Param('projectId') projectId: string,
    @Body() assignedDto: AssignedDto
  ) {
    return this.inboxService.updateAssignedUser(assignedDto, projectId);
  }

  @Post('/project/:projectId/client/:clientId/update')
  update(
    @Param('projectId') projectId: string,
    @Param('clientId') clientId: string,
    @Body() clientData: ClientDataDto
  ) {
    return this.inboxService.update(parseInt(projectId), clientId, clientData);
  }

  @Get('project/:projectId/client/:clientId/getClientInfo')
  getUserInfo(
    @Param('projectId') projectId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.inboxService.getClientInfo(parseInt(projectId), clientId);
  }

  @Get('project/:projectId/getChannels')
  getChannels(
    @Param('projectId') projectId: string,
  ) {
    return this.inboxService.getChannels(parseInt(projectId));
  }
}
