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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const template_entity_1 = require("./template.entity");
const user_entity_1 = require("./user.entity");
const client_entity_1 = require("./client.entity");
let Project = class Project extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "timezone", void 0);
__decorate([
    typeorm_1.OneToMany(() => channel_entity_1.Channel, channel => channel.project),
    __metadata("design:type", Array)
], Project.prototype, "channels", void 0);
__decorate([
    typeorm_1.OneToMany(() => template_entity_1.Template, template => template.project),
    __metadata("design:type", Array)
], Project.prototype, "templates", void 0);
__decorate([
    typeorm_1.OneToMany(() => client_entity_1.Client, client => client.project),
    __metadata("design:type", Array)
], Project.prototype, "client", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.projects),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Project.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => client_entity_1.Client, client => client.project),
    __metadata("design:type", Array)
], Project.prototype, "project", void 0);
Project = __decorate([
    typeorm_1.Entity()
], Project);
exports.Project = Project;
//# sourceMappingURL=projects.entity.js.map