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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsController = void 0;
const common_1 = require("@nestjs/common");
const channels_service_1 = require("./channels.service");
const chat_settings_dto_1 = require("./dto/chat-settings.dto");
let ChannelsController = class ChannelsController {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    saveChatSettings(projectId, settingsDto) {
        return this.channelsService.saveChatSettings(settingsDto, projectId);
    }
    getChatSettings(projectId) {
        return this.channelsService.getChatSettings(projectId);
    }
};
__decorate([
    common_1.Post('/project/:projectId/saveChatSettings'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_settings_dto_1.ChatSettingsDto]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "saveChatSettings", null);
__decorate([
    common_1.Get('/project/:projectId/getChatSettings'),
    __param(0, common_1.Param('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "getChatSettings", null);
ChannelsController = __decorate([
    common_1.Controller('channels'),
    __metadata("design:paramtypes", [channels_service_1.ChannelsService])
], ChannelsController);
exports.ChannelsController = ChannelsController;
//# sourceMappingURL=channels.controller.js.map