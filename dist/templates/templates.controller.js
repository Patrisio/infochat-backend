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
exports.TemplatesController = void 0;
const common_1 = require("@nestjs/common");
const templates_service_1 = require("./templates.service");
const template_dto_1 = require("./dto/template.dto");
let TemplatesController = class TemplatesController {
    constructor(templatesService) {
        this.templatesService = templatesService;
    }
    getTemplatesByProjectId(projectId) {
        return this.templatesService.getTemplates(parseInt(projectId));
    }
    addTemplate(projectId, templateDto) {
        return this.templatesService.addTemplate(parseInt(projectId), templateDto);
    }
    deleteTemplateByTemplateId(projectId, templateId) {
        return this.templatesService.deleteTemplate(parseInt(projectId), templateId);
    }
    updateTemplateByTemplateId(projectId, templateDto) {
        return this.templatesService.updateTemplate(parseInt(projectId), templateDto);
    }
};
__decorate([
    common_1.Get('/project/:projectId/settings/getTemplates'),
    __param(0, common_1.Param('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "getTemplatesByProjectId", null);
__decorate([
    common_1.Post('/project/:projectId/settings/addTemplate'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, template_dto_1.TemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "addTemplate", null);
__decorate([
    common_1.Post('/project/:projectId/settings/deleteTemplate'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "deleteTemplateByTemplateId", null);
__decorate([
    common_1.Post('/project/:projectId/settings/updateTemplate'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, template_dto_1.TemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "updateTemplateByTemplateId", null);
TemplatesController = __decorate([
    common_1.Controller('templates'),
    __metadata("design:paramtypes", [templates_service_1.TemplatesService])
], TemplatesController);
exports.TemplatesController = TemplatesController;
//# sourceMappingURL=templates.controller.js.map