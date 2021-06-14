import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TariffRepository } from './tariff.repository';
import { ProjectRepository } from './projects.repository';
import { ProjectDto } from './dto/project.dto';
import { TariffPlanDto } from './dto/tariffPlan.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    @InjectRepository(TariffRepository)
    private tariffRepository: TariffRepository,
  ) {}

  async addProject(projectDto: ProjectDto) {
    return this.projectRepository.addProject(projectDto);
  }

  async getTariffPlanByProjectId(projectId: number) {
    return this.tariffRepository.getTariffPlanByProjectId(projectId);
  }

  async updateTariffPlanByProjectId(projectId: number, tariffPlanDto: TariffPlanDto) {
    return this.tariffRepository.updateTariffPlanByProjectId(projectId, tariffPlanDto);
  }
}
