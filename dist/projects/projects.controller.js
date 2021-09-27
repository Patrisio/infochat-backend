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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const project_dto_1 = require("./dto/project.dto");
const tariffPlan_dto_1 = require("./dto/tariffPlan.dto");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    getProjectTariffPlan(projectId) {
        return this.projectsService.getTariffPlanByProjectId(parseInt(projectId));
    }
    saveChatSettings(projectDto) {
        return this.projectsService.addProject(projectDto);
    }
    updateProjectTariffPlan(projectId, tariffPlanDto) {
        return this.projectsService.updateTariffPlanByProjectId(parseInt(projectId), tariffPlanDto);
    }
};
__decorate([
    common_1.Get('project/:projectId/settings/getProjectTariffPlan'),
    __param(0, common_1.Param('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProjectTariffPlan", null);
__decorate([
    common_1.Post('/addProject'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "saveChatSettings", null);
__decorate([
    common_1.Post('project/:projectId/settings/updateProjectTariffPlan'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tariffPlan_dto_1.TariffPlanDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateProjectTariffPlan", null);
ProjectsController = __decorate([
    common_1.Controller('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map