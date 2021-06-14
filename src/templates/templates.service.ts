import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateRepository } from './template.repository';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TemplateRepository)
    private templateRepository: TemplateRepository,
  ) {}

  getTemplates(projectId: number) {
    return this.templateRepository.getTemplates(projectId);
  }

  addTemplate(projectId: number, templateDto) {
    return this.templateRepository.addTemplate(projectId, templateDto);
  }

  deleteTemplate(projectId: number, templateId) {
    return this.templateRepository.deleteTemplate(projectId, templateId.templateId);
  }

  updateTemplate(projectId: number, templateDto) {
    return this.templateRepository.updateTemplate(projectId, templateDto);
  }
}
