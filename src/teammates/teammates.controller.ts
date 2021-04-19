import { Controller, Post, Body, Res, UseGuards, Param, Get, ValidationPipe, Req, Query, Put, Delete, Patch } from '@nestjs/common';
import { TeammatesService } from './teammates.service';
import { TeammateDto } from './dto/teammate.dto';

@Controller('teammates')
export class TeammatesController {
  constructor(
    private teammatesService: TeammatesService
  ) {}

  @Get('/project/:projectId/settings/teammates')
  getTeammatesByProjectId(
    @Param('projectId') projectId
  ) {
    return this.teammatesService.getTeammatesByProjectId(parseInt(projectId));
  }

  @Post('/project/:projectId/settings/teammates/addTeammate')
  addTeammate(
    @Body() teammateDto: TeammateDto
  ) {
    return this.teammatesService.addTeammate(teammateDto);
  }

  @Patch('/project/:projectId/updateDialogForAllTeammates')
  updateDialogForAllTeammates(
    @Param('projectId') projectId: string,
    @Body() dialogUpdates: any
  ) {
    return this.teammatesService.updateDialogForAllTeammates(projectId, dialogUpdates);
  }

  @Delete('/project/:projectId/settings/teammates/deleteTeammate')
  deleteTeammate(
    @Body() emailObject
  ) {
    return this.teammatesService.deleteTeammate(emailObject);
  }
}
