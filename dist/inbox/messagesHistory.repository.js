"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesHistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const messagesHistory_entity_1 = require("../entities/messagesHistory.entity");
const client_entity_1 = require("../entities/client.entity");
let MessagesHistoryRepository = class MessagesHistoryRepository extends typeorm_1.Repository {
    async getMessagesHistory(clientDto) {
        const row = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select(`"isBlocked"`)
            .from(client_entity_1.Client, 'client')
            .where('id = :clientId', { clientId: clientDto.clientId })
            .getRawOne();
        if (row && (row === null || row === void 0 ? void 0 : row.isBlocked)) {
            return {
                id: null,
                clientId: '',
                projectId: '',
                messagesHistory: [],
                isBlocked: row === null || row === void 0 ? void 0 : row.isBlocked,
            };
        }
        const data = await typeorm_1.getConnection()
            .query(`
        SELECT client.id, client."assignedTo", "avatarName", "avatarColor", messages_history.client_id, messages_history.message, messages_history.username 
        FROM client
        JOIN messages_history ON client.id = messages_history.client_id
        WHERE project_id = $1 AND client.id = $2
      `, [clientDto.projectId, clientDto.clientId]);
        return {
            id: null,
            clientId: '',
            projectId: '',
            messagesHistory: data,
            isBlocked: row === null || row === void 0 ? void 0 : row.isBlocked,
        };
    }
    async addMessage(newMessage, clientId) {
        const { message, timestamp, username } = newMessage;
        console.log(newMessage, 'newMessage');
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(messagesHistory_entity_1.MessagesHistory)
                .values({
                message,
                username,
                client: clientId
            })
                .execute();
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
MessagesHistoryRepository = __decorate([
    typeorm_1.EntityRepository(messagesHistory_entity_1.MessagesHistory)
], MessagesHistoryRepository);
exports.MessagesHistoryRepository = MessagesHistoryRepository;
//# sourceMappingURL=messagesHistory.repository.js.map