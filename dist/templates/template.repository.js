"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const template_entity_1 = require("../entities/template.entity");
const projects_entity_1 = require("../entities/projects.entity");
let TemplateRepository = class TemplateRepository extends typeorm_1.Repository {
    async getTemplates(projectId) {
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["templates"] });
        const project = projects.find((project) => project.id === projectId);
        try {
            return {
                code: 200,
                templates: project.templates
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async addTemplate(projectId, templateDto) {
        const { id, name, message } = templateDto;
        const template = new template_entity_1.Template();
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteTemplate(projectId, templateId) {
        const template = new template_entity_1.Template();
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["templates"] });
        const project = projects.find((project) => project.id === projectId);
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(template_entity_1.Template)
                .where('project_id = :projectId AND id = :templateId', { projectId: project.id, templateId })
                .execute();
            project.templates = [...project.templates, template].filter((template) => template.id !== templateId);
            project.save();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateTemplate(projectId, templateDto) {
        const { id, name, message } = templateDto;
        const template = new template_entity_1.Template();
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["templates"] });
        const project = projects.find((project) => project.id === projectId);
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(template_entity_1.Template)
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
TemplateRepository = __decorate([
    typeorm_1.EntityRepository(template_entity_1.Template)
], TemplateRepository);
exports.TemplateRepository = TemplateRepository;
//# sourceMappingURL=template.repository.js.map