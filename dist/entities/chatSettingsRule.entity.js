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
exports.ChatSettingsRule = void 0;
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const chatSettingsCondition_entity_1 = require("./chatSettingsCondition.entity");
let ChatSettingsRule = class ChatSettingsRule extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], ChatSettingsRule.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettingsRule.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ChatSettingsRule.prototype, "isActivate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettingsRule.prototype, "result", void 0);
__decorate([
    typeorm_1.OneToMany(() => chatSettingsCondition_entity_1.ChatSettingsCondition, condition => condition.rule),
    typeorm_1.JoinColumn([
        { name: "condition_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", chatSettingsCondition_entity_1.ChatSettingsCondition)
], ChatSettingsRule.prototype, "condition", void 0);
__decorate([
    typeorm_1.ManyToOne(() => channel_entity_1.Channel, channel => channel.operators),
    typeorm_1.JoinColumn([
        { name: "channel_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", channel_entity_1.Channel)
], ChatSettingsRule.prototype, "channel", void 0);
ChatSettingsRule = __decorate([
    typeorm_1.Entity()
], ChatSettingsRule);
exports.ChatSettingsRule = ChatSettingsRule;
//# sourceMappingURL=chatSettingsRule.entity.js.map