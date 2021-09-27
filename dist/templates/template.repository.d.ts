import { Repository } from 'typeorm';
import { Template } from '../entities/template.entity';
export declare class TemplateRepository extends Repository<Template> {
    getTemplates(projectId: number): Promise<{
        code: number;
        templates: Template[];
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
