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
exports.TeammatesController = void 0;
const common_1 = require("@nestjs/common");
const teammates_service_1 = require("./teammates.service");
const teammate_dto_1 = require("./dto/teammate.dto");
const teammate_data_dto_1 = require("./dto/teammate-data.dto");
let TeammatesController = class TeammatesController {
    constructor(teammatesService) {
        this.teammatesService = teammatesService;
    }
    getTeammatesByProjectId(projectId) {
        return this.teammatesService.getTeammatesByProjectId(parseInt(projectId));
    }
    addTeammate(projectId, teammateDto) {
        return this.teammatesService.addTeammate(Object.assign(Object.assign({}, teammateDto), { projectId: parseInt(projectId) }));
    }
    updateTeammate(projectId, teammateDataDto) {
        return this.teammatesService.updateTeammate(teammateDataDto, parseInt(projectId));
    }
    deleteTeammate(emailObject) {
        return this.teammatesService.deleteTeammate(emailObject);
    }
};
__decorate([
    common_1.Get('/project/:projectId/settings/teammates'),
    __param(0, common_1.Param('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeammatesController.prototype, "getTeammatesByProjectId", null);
__decorate([
    common_1.Post('/project/:projectId/settings/teammates/addTeammate'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, teammate_dto_1.TeammateDto]),
    __metadata("design:returntype", void 0)
], TeammatesController.prototype, "addTeammate", null);
__decorate([
    common_1.Post('/project/:projectId/settings/teammates/updateTeammate'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, teammate_data_dto_1.TeammateDataDto]),
    __metadata("design:returntype", void 0)
], TeammatesController.prototype, "updateTeammate", null);
__decorate([
    common_1.Post('/project/:projectId/settings/teammates/deleteTeammate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeammatesController.prototype, "deleteTeammate", null);
TeammatesController = __decorate([
    common_1.Controller('teammates'),
    __metadata("design:paramtypes", [teammates_service_1.TeammatesService])
], TeammatesController);
exports.TeammatesController = TeammatesController;
//# sourceMappingURL=teammates.controller.js.map