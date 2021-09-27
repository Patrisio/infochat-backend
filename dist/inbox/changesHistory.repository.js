"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangesHistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const changesHistory_entity_1 = require("../entities/changesHistory.entity");
const client_entity_1 = require("../entities/client.entity");
let ChangesHistoryRepository = class ChangesHistoryRepository extends typeorm_1.Repository {
    async getChangesHistory(clientId) {
        try {
            const changesHistory = await typeorm_1.getConnection()
                .createQueryBuilder()
                .select('before, after, "changeInFieldValue", timestamp')
                .from(changesHistory_entity_1.ChangesHistory, 'changesHistory')
                .where('client_id = :clientId', { clientId })
                .execute();
            for (let i = 0; i < changesHistory.length; i++) {
                const changesHistoryItem = changesHistory[i];
                changesHistoryItem.timestamp = Date.parse(changesHistoryItem.timestamp);
            }
            return changesHistory;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async addChanges(projectId, clientId, clientDataDto) {
        const { updatedBy } = clientDataDto;
        function isUndefined(value) {
            return value === undefined;
        }
        function isEqual(firstValue, secondValue) {
            return firstValue === secondValue;
        }
        const { email, phone, avatarName } = await client_entity_1.Client.findOne({ id: clientId, project: projectId });
        const newEmail = clientDataDto.email;
        const newPhone = clientDataDto.phone;
        const newAvatarName = clientDataDto.avatarName;
        const changeInFieldValue = clientDataDto.changeInFieldValue;
        const insertNewChange = async (oldFieldValue, newFieldValue) => {
            try {
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(changesHistory_entity_1.ChangesHistory)
                    .values({
                    before: oldFieldValue,
                    after: newFieldValue,
                    client: clientId,
                    changeInFieldValue,
                })
                    .execute();
                return {
                    statusCode: 200,
                    status: 'success',
                };
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        };
        if (updatedBy === 'client')
            return;
        if (updatedBy === 'operator') {
            if (!isEqual(newEmail, email)) {
                console.log(111);
                await insertNewChange(email, newEmail);
            }
            if (!isEqual(newPhone, phone)) {
                console.log(222);
                await insertNewChange(phone, newPhone);
            }
            if (!isEqual(newAvatarName, avatarName)) {
                console.log(333);
                await insertNewChange(avatarName, newAvatarName);
            }
        }
    }
};
ChangesHistoryRepository = __decorate([
    typeorm_1.EntityRepository(changesHistory_entity_1.ChangesHistory)
], ChangesHistoryRepository);
exports.ChangesHistoryRepository = ChangesHistoryRepository;
//# sourceMappingURL=changesHistory.repository.js.map