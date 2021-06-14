import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService
  ) {}

  @Post('/addProject')
  saveChatSettings(
    @Body() projectDto: ProjectDto,
  ) {
    return this.projectsService.addProject(projectDto);
  }
}
