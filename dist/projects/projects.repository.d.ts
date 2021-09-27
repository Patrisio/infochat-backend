import { Repository } from 'typeorm';
import { Project } from '../entities/projects.entity';
import { ProjectDto } from './dto/project.dto';
export declare class ProjectRepository extends Repository<Project> {
    addProject(projectDto: ProjectDto): Promise<{
        id: any;
    }>;
}
