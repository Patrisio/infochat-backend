import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';
import { TariffPlanDto } from './dto/tariffPlan.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService
  ) {}

  @Get('project/:projectId/settings/getProjectTariffPlan')
  getProjectTariffPlan(
    @Param('projectId') projectId: string,
  ) {
    return this.projectsService.getTariffPlanByProjectId(parseInt(projectId));
  }

  @Post('/addProject')
  saveChatSettings(
    @Body() projectDto: ProjectDto,
  ) {
    return this.projectsService.addProject(projectDto);
  }

  @Post('project/:projectId/settings/updateProjectTariffPlan')
  updateProjectTariffPlan(
    @Param('projectId') projectId: string,
    @Body() tariffPlanDto: TariffPlanDto,
  ) {
    return this.projectsService.updateTariffPlanByProjectId(parseInt(projectId), tariffPlanDto);
  }
}
