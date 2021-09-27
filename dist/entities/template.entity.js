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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("./projects.entity");
let Template = class Template extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Template.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Template.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Template.prototype, "message", void 0);
__decorate([
    typeorm_1.ManyToOne(() => projects_entity_1.Project, project => project.templates),
    typeorm_1.JoinColumn([
        { name: "project_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", Number)
], Template.prototype, "project", void 0);
Template = __decorate([
    typeorm_1.Entity()
], Template);
exports.Template = Template;
//# sourceMappingURL=template.entity.js.map