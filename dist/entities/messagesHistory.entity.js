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
exports.MessagesHistory = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
let MessagesHistory = class MessagesHistory extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], MessagesHistory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MessagesHistory.prototype, "message", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MessagesHistory.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('timestamp', { default: () => 'LOCALTIMESTAMP' }),
    __metadata("design:type", Date)
], MessagesHistory.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.ManyToOne(() => client_entity_1.Client, client => client.messages_history, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn([
        { name: "client_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", client_entity_1.Client)
], MessagesHistory.prototype, "client", void 0);
MessagesHistory = __decorate([
    typeorm_1.Entity()
], MessagesHistory);
exports.MessagesHistory = MessagesHistory;
//# sourceMappingURL=messagesHistory.entity.js.map