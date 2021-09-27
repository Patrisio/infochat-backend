"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tariff_entity_1 = require("../entities/tariff.entity");
let TariffRepository = class TariffRepository extends typeorm_1.Repository {
    async getTariffPlanByProjectId(projectId) {
        try {
            const { operatorsCount, chatCount, templatesCount, infochatLinkCount } = await tariff_entity_1.Tariff.findOne({ project: projectId });
            const formattedTariffPlan = [
                {
                    id: 'operators',
                    count: operatorsCount,
                },
                {
                    id: 'infochatLink',
                    count: infochatLinkCount,
                },
                {
                    id: 'templates',
                    count: templatesCount,
                },
                {
                    id: 'chat',
                    count: chatCount,
                },
            ];
            return {
                code: 200,
                tariffPlan: formattedTariffPlan,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateTariffPlanByProjectId(projectId, tariffPlanDto) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(tariff_entity_1.Tariff)
                .set(tariffPlanDto)
                .where('project_id = :projectId', { projectId })
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
TariffRepository = __decorate([
    typeorm_1.EntityRepository(tariff_entity_1.Tariff)
], TariffRepository);
exports.TariffRepository = TariffRepository;
//# sourceMappingURL=tariff.repository.js.map