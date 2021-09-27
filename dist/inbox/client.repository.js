"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../entities/client.entity");
const changesHistory_entity_1 = require("src/entities/changesHistory.entity");
let ClientRepository = class ClientRepository extends typeorm_1.Repository {
    async findDuplicateByClientId(clientId) {
        return await this.findOne({ id: clientId });
    }
    async getClientInfo(projectId, clientId) {
        const client = await this.findOne({ project: projectId, id: clientId });
        const changesHistory = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select('before, after, timestamp')
            .from(changesHistory_entity_1.ChangesHistory, 'changesHistory')
            .where('client_id = :clientId', { clientId })
            .execute();
        for (let i = 0; i < changesHistory.length; i++) {
            const changesHistoryItem = changesHistory[i];
            changesHistoryItem.timestamp = Date.parse(changesHistoryItem.timestamp);
        }
        if (client) {
            return {
                changesHistory,
                notes: [],
            };
        }
    }
    async deleteClientAppealByClientId(projectId, clientId) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(client_entity_1.Client)
                .where("project_id = :project_id AND id = :clientId", {
                project_id: projectId,
                clientId
            })
                .execute();
            return {
                statusCode: 200,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getMessagesHistoryByProjectId(projectId) {
        const data = await typeorm_1.getConnection()
            .query(`
        SELECT client.id, client."isBlocked", client."assignedTo", client.email, client.phone, "messagesStatus", "avatarName", "avatarColor", messages_history.client_id, messages_history.message, messages_history.username,  messages_history.timestamp 
        FROM client
        JOIN messages_history ON client.id = messages_history.client_id
        WHERE project_id = $1
      `, [projectId]);
        console.log(data);
        const clients = data.reduce((acc, client) => {
            const foundClient = acc.find((c) => c.clientId === client.id);
            if (foundClient) {
                foundClient.messagesHistory.push({
                    message: client.message,
                    timestamp: Date.parse(client.timestamp),
                    username: client.username,
                });
                return acc;
            }
            acc.push({
                clientId: client.id,
                isBlocked: client.isBlocked,
                assignedTo: client.assignedTo,
                email: client.email,
                phone: client.phone,
                avatarName: client.avatarName,
                avatarColor: client.avatarColor,
                messagesStatus: client.messagesStatus,
                messagesHistory: [{
                        message: client.message,
                        timestamp: Date.parse(client.timestamp),
                        username: client.username,
                    }]
            });
            return acc;
        }, []);
        return clients;
    }
    async addClientData(messageDto) {
        const { clientId, projectId, avatarName, avatarColor } = messageDto;
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(client_entity_1.Client)
                .values({
                project: parseInt(projectId),
                avatarName,
                avatarColor,
                id: clientId,
                messagesStatus: 'unread',
            })
                .execute();
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateMessagesStatusByClientId(projectId, clientId, messagesStatusDto) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(client_entity_1.Client)
                .set(messagesStatusDto)
                .where("project_id = :project_id AND id = :clientId", {
                project_id: projectId,
                clientId
            })
                .execute();
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
    async updateClientData(projectId, clientId, clientDataDto) {
        const { avatarName, email, phone, assignedTo, isBlocked, } = clientDataDto;
        try {
            console.log(clientDataDto);
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(client_entity_1.Client)
                .set({
                avatarName,
                email,
                phone,
                assignedTo,
                isBlocked,
            })
                .where('project_id = :projectId AND id = :clientId', { projectId, clientId })
                .execute();
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
    async remapDialogsToSelectedTeammate(projectId, teammatesEmails) {
        const { deletedTeammateEmail, teammateEmailForRemapDialogs } = teammatesEmails;
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(client_entity_1.Client)
                .set({ assignedTo: teammateEmailForRemapDialogs })
                .where('project_id = :projectId AND assignedTo = :assignedTo', { projectId, assignedTo: deletedTeammateEmail })
                .execute();
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
};
ClientRepository = __decorate([
    typeorm_1.EntityRepository(client_entity_1.Client)
], ClientRepository);
exports.ClientRepository = ClientRepository;
//# sourceMappingURL=client.repository.js.map