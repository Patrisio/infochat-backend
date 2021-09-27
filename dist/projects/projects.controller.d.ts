import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';
import { TariffPlanDto } from './dto/tariffPlan.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    getProjectTariffPlan(projectId: string): Promise<{
        code: number;
        tariffPlan: {
            id: string;
            count: number;
        }[];
    }>;
    saveChatSettings(projectDto: ProjectDto): Promise<{
        id: any;
    }>;
    updateProjectTariffPlan(projectId: string, tariffPlanDto: TariffPlanDto): Promise<{
        code: number;
        status: string;
    }>;
}
