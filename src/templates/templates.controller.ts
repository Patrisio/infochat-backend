import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplateDto } from './dto/template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(
    private templatesService: TemplatesService
  ) {}

  @Get('/project/:projectId/settings/getTemplates')
  getTemplatesByProjectId(
    @Param('projectId') projectId,
  ) {
    return this.templatesService.getTemplates(parseInt(projectId));
  }

  @Post('/project/:projectId/settings/addTemplate')
  addTemplate(
    @Param('projectId') projectId,
    @Body() templateDto: TemplateDto
  ) {
    return this.templatesService.addTemplate(parseInt(projectId), templateDto);
  }

  @Post('/project/:projectId/settings/deleteTemplate')
  deleteTemplateByTemplateId(
    @Param('projectId') projectId,
    @Body() templateId
  ) {
    return this.templatesService.deleteTemplate(parseInt(projectId), templateId);
  }

  @Post('/project/:projectId/settings/updateTemplate')
  updateTemplateByTemplateId(
    @Param('projectId') projectId,
    @Body() templateDto: TemplateDto
  ) {
    return this.templatesService.updateTemplate(parseInt(projectId), templateDto);
  }
}
