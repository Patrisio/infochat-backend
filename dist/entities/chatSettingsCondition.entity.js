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
exports.ChatSettingsCondition = void 0;
const typeorm_1 = require("typeorm");
const chatSettingsRule_entity_1 = require("./chatSettingsRule.entity");
let ChatSettingsCondition = class ChatSettingsCondition extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChatSettingsCondition.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettingsCondition.prototype, "variant", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettingsCondition.prototype, "operator", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettingsCondition.prototype, "value", void 0);
__decorate([
    typeorm_1.ManyToOne(() => chatSettingsRule_entity_1.ChatSettingsRule, rule => rule.condition, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn([
        { name: "rule_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", chatSettingsRule_entity_1.ChatSettingsRule)
], ChatSettingsCondition.prototype, "rule", void 0);
ChatSettingsCondition = __decorate([
    typeorm_1.Entity()
], ChatSettingsCondition);
exports.ChatSettingsCondition = ChatSettingsCondition;
//# sourceMappingURL=chatSettingsCondition.entity.js.map