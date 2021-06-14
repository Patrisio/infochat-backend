import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection, QueryRunner } from 'typeorm';
import { Template } from '../entities/template.entity';
import { Project } from '../entities/projects.entity';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async getTemplates(projectId: number) {
    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["templates"] });
    const project = projects.find((project) => project.id === projectId);

    try {
      return {
        code: 200,
        templates: project.templates
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async addTemplate(projectId: number, templateDto) {
    const { id, name, message } = templateDto;

    const template = new Template();

    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["templates"] });
    const project = projects.find((project) => project.id === projectId);

    template.id = id;
    template.name = name;
    template.message = message;
    template.project = project.id;
    template.save();

    try {
      project.templates = [...project.templates, template];
      project.save();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteTemplate(projectId: number, templateId) {
    const template = new Template();

    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["templates"] });
    const project = projects.find((project) => project.id === projectId);

    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Template)
        .where('project_id = :projectId AND id = :templateId', { projectId: project.id, templateId })
        .execute();

      project.templates = [...project.templates, template].filter((template: any) => template.id !== templateId);
      project.save();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateTemplate(projectId: number, templateDto) {
    const { id, name, message  } = templateDto;
    const template = new Template();

    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["templates"] });
    const project = projects.find((project) => project.id === projectId);

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Template)
        .set({
          name,
          message,
        })
        .where('project_id = :projectId AND id = :templateId', { projectId: project.id, templateId: id })
        .execute();

      const templates = project.templates;
      const foundTemplateIndex = templates.findIndex((template) => template.id === id);
      const foundTemplate = templates.find((template) => template.id === id);

      if (foundTemplate) {
        foundTemplate.name = name;
        foundTemplate.message = message;
      }

      templates.splice(foundTemplateIndex, 1, foundTemplate);
      project.templates = [...project.templates, template];
      project.save();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}