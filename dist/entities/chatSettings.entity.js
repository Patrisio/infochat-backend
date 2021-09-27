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
exports.ChatSettings = void 0;
const typeorm_1 = require("typeorm");
let ChatSettings = class ChatSettings extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChatSettings.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "chatName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "greeting", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ChatSettings.prototype, "backgroundImage", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "buttonLocation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "buttonScale", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ChatSettings.prototype, "buttonWidth", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "buttonText", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ChatSettings.prototype, "infochatLinkEnabled", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "customCss", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ChatSettings.prototype, "timezone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "requestText", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatSettings.prototype, "responseTimeText", void 0);
__decorate([
    typeorm_1.Column({ default: 10 }),
    __metadata("design:type", Number)
], ChatSettings.prototype, "timeWithoutAnswer", void 0);
ChatSettings = __decorate([
    typeorm_1.Entity()
], ChatSettings);
exports.ChatSettings = ChatSettings;
//# sourceMappingURL=chatSettings.entity.js.map