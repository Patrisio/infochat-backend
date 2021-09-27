import { TemplateRepository } from './template.repository';
export declare class TemplatesService {
    private templateRepository;
    constructor(templateRepository: TemplateRepository);
    getTemplates(projectId: number): Promise<{
        code: number;
        templates: import("../entities/template.entity").Template[];
    }>;
    addTemplate(projectId: number, templateDto: any): Promise<{
        code: number;
        status: string;
    }>;
    deleteTemplate(projectId: number, templateId: any): Promise<{
        code: number;
        status: string;
    }>;
    updateTemplate(projectId: number, templateDto: any): Promise<{
        code: number;
        status: string;
    }>;
}
