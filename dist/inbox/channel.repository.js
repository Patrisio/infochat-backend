"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("../entities/channel.entity");
let ChannelRepository = class ChannelRepository extends typeorm_1.Repository {
    async add(channel, projectId) {
        const { name } = channel;
        try {
            await typeorm_1.getConnection()
                .query('INSERT INTO channel (project_id, name, status) VALUES ($1, $2, $3)', [projectId, name, 'pending']);
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
    async getChannels(projectId) {
        try {
            const channels = await typeorm_1.getConnection()
                .createQueryBuilder()
                .select('name, status')
                .from(channel_entity_1.Channel, 'channel')
                .where('project_id = :projectId', { projectId })
                .execute();
            return {
                statusCode: 200,
                data: channels,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
ChannelRepository = __decorate([
    typeorm_1.EntityRepository(channel_entity_1.Channel)
], ChannelRepository);
exports.ChannelRepository = ChannelRepository;
//# sourceMappingURL=channel.repository.js.map