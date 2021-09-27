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
exports.InboxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messagesHistory_repository_1 = require("./messagesHistory.repository");
const channel_repository_1 = require("./channel.repository");
const user_repository_1 = require("../auth/user.repository");
const note_repository_1 = require("./note.repository");
const client_repository_1 = require("./client.repository");
const changesHistory_repository_1 = require("./changesHistory.repository");
let InboxService = class InboxService {
    constructor(messagesHistoryRepository, userRepository, channelRepository, clientRepository, changesHistoryRepository, noteRepository) {
        this.messagesHistoryRepository = messagesHistoryRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
        this.clientRepository = clientRepository;
        this.changesHistoryRepository = changesHistoryRepository;
        this.noteRepository = noteRepository;
    }
    async addMessage(messageDto) {
        const { clientId, message } = messageDto;
        const historyMessage = await this.clientRepository.findDuplicateByClientId(clientId);
        if (historyMessage) {
            await this.messagesHistoryRepository.addMessage(message, clientId);
        }
        else {
            await this.clientRepository.addClientData(messageDto);
            await this.messagesHistoryRepository.addMessage(message, clientId);
        }
        return {
            code: 200,
            status: 'success'
        };
    }
    async deleteClientAppealByClientId(projectId, clientId) {
        return await this.clientRepository.deleteClientAppealByClientId(projectId, clientId);
    }
    async updateMessagesStatusByClientId(projectId, clientId, messagesStatusDto) {
        return await this.clientRepository.updateMessagesStatusByClientId(projectId, clientId, messagesStatusDto);
    }
    async getMessagesHistory(clientDto) {
        return this.messagesHistoryRepository.getMessagesHistory(clientDto);
    }
    async getMessagesHistoryByProjectId(projectId) {
        return this.clientRepository.getMessagesHistoryByProjectId(projectId);
    }
    async getClientInfo(projectId, clientId) {
        try {
            const changesHistory = await this.changesHistoryRepository.getChangesHistory(clientId);
            const notes = await this.noteRepository.getNotes(clientId);
            return {
                changesHistory,
                notes,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async update(projectId, clientId, clientDataDto) {
        try {
            await this.changesHistoryRepository.addChanges(projectId, clientId, clientDataDto);
            await this.clientRepository.updateClientData(projectId, clientId, clientDataDto);
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async addChannel(channel, projectId) {
        return this.channelRepository.add(channel, projectId);
    }
    async getChannels(projectId) {
        return this.channelRepository.getChannels(projectId);
    }
    async addNote(clientId, noteDataDto) {
        return this.noteRepository.addNote(clientId, noteDataDto);
    }
    async deleteNote(noteId) {
        return this.noteRepository.deleteNote(noteId);
    }
    async remapDialogsToSelectedTeammate(projectId, teammatesEmails) {
        return this.clientRepository.remapDialogsToSelectedTeammate(projectId, teammatesEmails);
    }
};
InboxService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(messagesHistory_repository_1.MessagesHistoryRepository)),
    __param(1, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __param(2, typeorm_1.InjectRepository(channel_repository_1.ChannelRepository)),
    __param(3, typeorm_1.InjectRepository(client_repository_1.ClientRepository)),
    __param(4, typeorm_1.InjectRepository(changesHistory_repository_1.ChangesHistoryRepository)),
    __param(5, typeorm_1.InjectRepository(note_repository_1.NoteRepository)),
    __metadata("design:paramtypes", [messagesHistory_repository_1.MessagesHistoryRepository,
        user_repository_1.UserRepository,
        channel_repository_1.ChannelRepository,
        client_repository_1.ClientRepository,
        changesHistory_repository_1.ChangesHistoryRepository,
        note_repository_1.NoteRepository])
], InboxService);
exports.InboxService = InboxService;
//# sourceMappingURL=inbox.service.js.map