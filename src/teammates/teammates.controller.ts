import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TeammatesService } from './teammates.service';
import { TeammateDto } from './dto/teammate.dto';
import { TeammateDataDto } from './dto/teammate-data.dto';

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
    @Param('projectId') projectId,
    @Body() teammateDto: TeammateDto
  ) {
    return this.teammatesService.addTeammate({ ...teammateDto, projectId: parseInt(projectId) });
  }

  @Post('/project/:projectId/settings/teammates/updateTeammate')
  updateTeammate(
    @Param('projectId') projectId,
    @Body() teammateDataDto: TeammateDataDto
  ) {
    return this.teammatesService.updateTeammate(teammateDataDto, parseInt(projectId));
  }

  @Post('/project/:projectId/settings/teammates/deleteTeammate')
  deleteTeammate(
    @Body() emailObject
  ) {
    return this.teammatesService.deleteTeammate(emailObject);
  }
}
