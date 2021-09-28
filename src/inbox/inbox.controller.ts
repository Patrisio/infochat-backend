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
import { MessageStatusDto } from './dto/message-status.dto';
import { NoteDataDto } from './dto/note-data.dto';

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
    readFile(
      resolve(__dirname, '..', '..', 'widgets', 'chat.js'),
      'utf8',
      function (err, data) {
        if (err) {
          return console.log(err);
        }

        const host = process.env.NODE_ENV === 'production' ?
          'https://infochat-production.herokuapp.com' :
          'http://localhost:3001';
    
        const widgetScriptFileWithProjectIdArgument = data.replace(/project_id/g, projectId);
        const widgetScriptFileWithAllArguments = widgetScriptFileWithProjectIdArgument.replace(/env_host/g, host);

        res.send(widgetScriptFileWithAllArguments);
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

  @Post('/project/:projectId/client/:clientId/deleteClientAppealByClientId')
  deleteClientAppealByClientId(
    @Param('projectId') projectId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.inboxService.deleteClientAppealByClientId(parseInt(projectId), clientId);
  }

  @Post('project/:projectId/client/:clientId/updateMessagesStatusByClientId')
  updateMessagesStatusByClientId(
    @Param('projectId') projectId: string,
    @Param('clientId') clientId: string,
    @Body() messagesStatusDto: MessageStatusDto
  ) {
    return this.inboxService.updateMessagesStatusByClientId(parseInt(projectId), clientId, messagesStatusDto);
  }

  @Post('/project/:projectId/addChannel')
  addChannel(
    @Body() channel: ChannelDto,
    @Param('projectId') projectId
  ) {
    return this.inboxService.addChannel(channel, parseInt(projectId));
  }

  @Post('/project/:projectId/client/:clientId/update')
  update(
    @Param('projectId') projectId: string,
    @Param('clientId') clientId: string,
    @Body() clientData: ClientDataDto
  ) {
    return this.inboxService.update(parseInt(projectId), clientId, clientData);
  }

  @Post('/client/:clientId/addNote')
  addNote(
    @Param('clientId') clientId: string,
    @Body() noteData: NoteDataDto
  ) {
    return this.inboxService.addNote( clientId, noteData);
  }

  @Post('/client/:clientId/deleteNote')
  deleteNote(
    @Body() id: { id: number }
  ) {
    return this.inboxService.deleteNote(id.id);
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

  @Post('/project/:projectId/remapDialogsToSelectedTeammate')
  remapDialogsToSelectedTeammate(
    @Param('projectId') projectId: string,
    @Body() teammatesEmails: {
      deletedTeammateEmail: string,
      teammateEmailForRemapDialogs: string,
    }
  ) {
    return this.inboxService.remapDialogsToSelectedTeammate(parseInt(projectId), teammatesEmails);
  }
}
