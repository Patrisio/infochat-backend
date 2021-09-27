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
exports.InboxGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let InboxGateway = class InboxGateway {
    constructor() {
        this.logger = new common_1.Logger('InboxGateway');
    }
    updateTeammateOnlineStatus(client, payload) {
        client.broadcast.emit('updateTeammateOnlineStatus', payload);
    }
    setActiveTeammateStatus(client, payload) {
        client.broadcast.emit('setActiveTeammateStatus', payload);
    }
    changeMessagesStatus(client, payload) {
        client.broadcast.emit('changeMessagesStatus', payload);
    }
    remapDialogsToSelectedTeammate(client, payload) {
        client.broadcast.emit('remapDialogsToSelectedTeammate', payload);
    }
    updateIncomingMessage(client, payload) {
        client.broadcast.emit('updateIncomingMessage', payload);
    }
    updateSelectedClient(client, payload) {
        client.broadcast.emit('updateSelectedClient', payload);
    }
    deleteFromInboxIncomingMessage(client, payload) {
        client.broadcast.emit('deleteFromInboxIncomingMessage', payload);
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
], InboxGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('updateTeammateOnlineStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "updateTeammateOnlineStatus", null);
__decorate([
    websockets_1.SubscribeMessage('setActiveTeammateStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "setActiveTeammateStatus", null);
__decorate([
    websockets_1.SubscribeMessage('changeMessagesStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "changeMessagesStatus", null);
__decorate([
    websockets_1.SubscribeMessage('remapDialogsToSelectedTeammate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "remapDialogsToSelectedTeammate", null);
__decorate([
    websockets_1.SubscribeMessage('updateIncomingMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "updateIncomingMessage", null);
__decorate([
    websockets_1.SubscribeMessage('updateSelectedClient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "updateSelectedClient", null);
__decorate([
    websockets_1.SubscribeMessage('deleteFromInboxIncomingMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "deleteFromInboxIncomingMessage", null);
InboxGateway = __decorate([
    websockets_1.WebSocketGateway()
], InboxGateway);
exports.InboxGateway = InboxGateway;
//# sourceMappingURL=inbox.gateway.js.map