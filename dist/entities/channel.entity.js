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
exports.Channel = void 0;
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("./projects.entity");
const chatSettings_entity_1 = require("./chatSettings.entity");
const chatSettingsOperator_entity_1 = require("./chatSettingsOperator.entity");
const chatSettingsBusinessDays_entity_1 = require("./chatSettingsBusinessDays.entity");
let Channel = class Channel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Channel.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(() => projects_entity_1.Project, project => project.channels),
    typeorm_1.JoinColumn([
        { name: "project_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", projects_entity_1.Project)
], Channel.prototype, "project", void 0);
__decorate([
    typeorm_1.OneToOne(type => chatSettings_entity_1.ChatSettings),
    typeorm_1.JoinColumn([
        { name: "chat_settings_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", Number)
], Channel.prototype, "chatSettingsId", void 0);
__decorate([
    typeorm_1.OneToMany(() => chatSettingsOperator_entity_1.ChatSettingsOperator, chatSettingsOperator => chatSettingsOperator.channel),
    __metadata("design:type", Array)
], Channel.prototype, "operators", void 0);
__decorate([
    typeorm_1.OneToMany(() => chatSettingsBusinessDays_entity_1.ChatSettingsBusinessDays, chatSettingsBusinessDays => chatSettingsBusinessDays.channel),
    __metadata("design:type", Array)
], Channel.prototype, "businessDays", void 0);
Channel = __decorate([
    typeorm_1.Entity()
], Channel);
exports.Channel = Channel;
//# sourceMappingURL=channel.entity.js.map