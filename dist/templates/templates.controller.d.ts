import { TemplatesService } from './templates.service';
import { TemplateDto } from './dto/template.dto';
export declare class TemplatesController {
    private templatesService;
    constructor(templatesService: TemplatesService);
    getTemplatesByProjectId(projectId: any): Promise<{
        code: number;
        templates: import("../entities/template.entity").Template[];
    }>;
    addTemplate(projectId: any, templateDto: TemplateDto): Promise<{
        code: number;
        status: string;
    }>;
    deleteTemplateByTemplateId(projectId: any, templateId: any): Promise<{
        code: number;
        status: string;
    }>;
    updateTemplateByTemplateId(projectId: any, templateDto: TemplateDto): Promise<{
        code: number;
        status: string;
    }>;
}
