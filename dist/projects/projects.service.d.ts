import { TariffRepository } from './tariff.repository';
import { ProjectRepository } from './projects.repository';
import { ProjectDto } from './dto/project.dto';
import { TariffPlanDto } from './dto/tariffPlan.dto';
export declare class ProjectsService {
    private projectRepository;
    private tariffRepository;
    constructor(projectRepository: ProjectRepository, tariffRepository: TariffRepository);
    addProject(projectDto: ProjectDto): Promise<{
        id: any;
    }>;
    getTariffPlanByProjectId(projectId: number): Promise<{
        code: number;
        tariffPlan: {
            id: string;
            count: number;
        }[];
    }>;
    updateTariffPlanByProjectId(projectId: number, tariffPlanDto: TariffPlanDto): Promise<{
        code: number;
        status: string;
    }>;
}
