"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tariff_repository_1 = require("./tariff.repository");
const projects_repository_1 = require("./projects.repository");
let ProjectsService = class ProjectsService {
    constructor(projectRepository, tariffRepository) {
        this.projectRepository = projectRepository;
        this.tariffRepository = tariffRepository;
    }
    async addProject(projectDto) {
        return this.projectRepository.addProject(projectDto);
    }
    async getTariffPlanByProjectId(projectId) {
        return this.tariffRepository.getTariffPlanByProjectId(projectId);
    }
    async updateTariffPlanByProjectId(projectId, tariffPlanDto) {
        return this.tariffRepository.updateTariffPlanByProjectId(projectId, tariffPlanDto);
    }
};
ProjectsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(projects_repository_1.ProjectRepository)),
    __param(1, typeorm_1.InjectRepository(tariff_repository_1.TariffRepository)),
    __metadata("design:paramtypes", [projects_repository_1.ProjectRepository,
        tariff_repository_1.TariffRepository])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map