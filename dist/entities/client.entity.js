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
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const messagesHistory_entity_1 = require("./messagesHistory.entity");
const projects_entity_1 = require("./projects.entity");
const changesHistory_entity_1 = require("./changesHistory.entity");
const note_entity_1 = require("./note.entity");
let Client = class Client extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "assignedTo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Client.prototype, "avatarName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Client.prototype, "avatarColor", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Client.prototype, "messagesStatus", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Client.prototype, "isBlocked", void 0);
__decorate([
    typeorm_1.Column('timestamp', { default: () => 'LOCALTIMESTAMP' }),
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => projects_entity_1.Project, project => project.client, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn([
        { name: "project_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", Number)
], Client.prototype, "project", void 0);
__decorate([
    typeorm_1.OneToMany(() => messagesHistory_entity_1.MessagesHistory, messagesHistory => messagesHistory.client, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Client.prototype, "messages_history", void 0);
__decorate([
    typeorm_1.OneToMany(() => changesHistory_entity_1.ChangesHistory, changesHistory => changesHistory.client, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Client.prototype, "changesHistory", void 0);
__decorate([
    typeorm_1.OneToMany(() => note_entity_1.Note, note => note.client, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Client.prototype, "note", void 0);
Client = __decorate([
    typeorm_1.Entity()
], Client);
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map