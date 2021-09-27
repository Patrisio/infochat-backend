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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const template_repository_1 = require("./template.repository");
let TemplatesService = class TemplatesService {
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    getTemplates(projectId) {
        return this.templateRepository.getTemplates(projectId);
    }
    addTemplate(projectId, templateDto) {
        return this.templateRepository.addTemplate(projectId, templateDto);
    }
    deleteTemplate(projectId, templateId) {
        return this.templateRepository.deleteTemplate(projectId, templateId.templateId);
    }
    updateTemplate(projectId, templateDto) {
        return this.templateRepository.updateTemplate(projectId, templateDto);
    }
};
TemplatesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(template_repository_1.TemplateRepository)),
    __metadata("design:paramtypes", [template_repository_1.TemplateRepository])
], TemplatesService);
exports.TemplatesService = TemplatesService;
//# sourceMappingURL=templates.service.js.map