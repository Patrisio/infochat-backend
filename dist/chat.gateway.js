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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.logger = new common_1.Logger('ChatGateway');
    }
    handleMessage(client, payload) {
        console.log(payload, '==PAYLAOD++');
        this.server.to(payload.projectId).emit('addIncomingMessage', payload);
        this.server.to(payload.projectId).emit('updateUnreadDialog', payload);
    }
    handleOperatorMessageFromInfochat(client, payload) {
        this.server.to(payload.room).emit('addMessageToClientChat', payload.message);
    }
    handleRoomJoin(client, room) {
        client.join(room);
    }
    handleTransferChatSettings(client, payload) {
        this.server.to(payload.room).emit('transferChatSettingsToChatTrigger', payload.chatSettings);
    }
    blockOrUnblockClient(client, payload) {
        this.server.to(payload.room).emit('blockClient');
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('chatMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('operatorMessageFromInfochat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleOperatorMessageFromInfochat", null);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRoomJoin", null);
__decorate([
    websockets_1.SubscribeMessage('transferChatSettings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTransferChatSettings", null);
__decorate([
    websockets_1.SubscribeMessage('blockClient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "blockOrUnblockClient", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway()
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map