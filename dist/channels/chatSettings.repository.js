"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const chatSettings_entity_1 = require("../entities/chatSettings.entity");
const chatSettingsRule_entity_1 = require("../entities/chatSettingsRule.entity");
const chatSettingsCondition_entity_1 = require("../entities/chatSettingsCondition.entity");
const chatSettingsOperator_entity_1 = require("../entities/chatSettingsOperator.entity");
const chatSettingsBusinessDays_entity_1 = require("../entities/chatSettingsBusinessDays.entity");
const channel_entity_1 = require("../entities/channel.entity");
let ChatSettingsRepository = class ChatSettingsRepository extends typeorm_1.Repository {
    async saveChatSettings(chatSettingsDto, projectId) {
        const { backgroundImage, buttonLocation, buttonScale, buttonText, buttonWidth, chatName, customCss, greeting, infochatLinkEnabled, requestText, responseTimeText, timezone, timeWithoutAnswer = 10, } = chatSettingsDto;
        console.log(chatSettingsDto);
        try {
            const row = await typeorm_1.getConnection()
                .createQueryBuilder()
                .select('id, chat_settings_id')
                .from(channel_entity_1.Channel, 'channel')
                .where('project_id = :projectId', { projectId })
                .execute();
            const { id, chat_settings_id } = row[0];
            let rules = [];
            let conditions = [];
            rules = chatSettingsDto.rules.map((rule) => ({
                isActivate: rule.isActivate,
                name: rule.name,
                result: rule.result,
                channel: id,
                id: rule.id,
            }));
            conditions = chatSettingsDto.rules.reduce((conditions, rule) => {
                const ruleId = rule.id;
                const ruleConditions = rule.conditions;
                for (let i = 0; i < ruleConditions.length; i++) {
                    const { operator, value, variant } = ruleConditions[i];
                    conditions.push({
                        operator,
                        value,
                        variant,
                        channel: id,
                        rule: ruleId,
                    });
                }
                return conditions;
            }, []);
            const operators = chatSettingsDto.operators.map((operator) => ({
                name: operator.value,
                email: operator.id,
                channel: id,
            }));
            const businessDays = chatSettingsDto.businessDays.map((businessDay) => ({
                businessDayId: businessDay.businessDayId,
                weekday: businessDay.weekday,
                timeFrom: businessDay.timeFrom,
                timeTo: businessDay.timeTo,
                channel: id,
            }));
            if (chat_settings_id) {
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(chatSettings_entity_1.ChatSettings)
                    .set({
                    backgroundImage,
                    buttonLocation,
                    buttonScale,
                    buttonText,
                    buttonWidth,
                    chatName,
                    customCss,
                    greeting,
                    infochatLinkEnabled,
                    requestText,
                    responseTimeText,
                    timezone,
                    timeWithoutAnswer,
                })
                    .where('id = :chatSettingsId', { chatSettingsId: chat_settings_id })
                    .execute();
                console.log(1);
                this.updateOperators(id, operators);
                console.log(2);
                this.updateBusinessDays(id, businessDays);
                console.log(3);
                console.log(id);
                await this.updateRules(id, rules);
                console.log(4);
                this.insertConditions(conditions);
                console.log(5);
            }
            else {
                const insertedChatSettingsRow = await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(chatSettings_entity_1.ChatSettings)
                    .values({
                    backgroundImage,
                    buttonLocation,
                    buttonScale,
                    buttonText,
                    buttonWidth,
                    chatName,
                    customCss,
                    greeting,
                    infochatLinkEnabled,
                    requestText,
                    responseTimeText,
                    timezone,
                    timeWithoutAnswer,
                })
                    .execute();
                const chatSettingsId = insertedChatSettingsRow.raw[0].id;
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(channel_entity_1.Channel)
                    .set({
                    chatSettingsId,
                })
                    .where("project_id = :projectId", { projectId })
                    .execute();
                this.insertOperators(operators);
                this.insertBusinessDays(businessDays);
                await this.insertRules(rules);
                this.insertConditions(conditions);
            }
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
    async insertRules(rules) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsRule_entity_1.ChatSettingsRule)
            .values(rules)
            .execute();
    }
    async insertConditions(conditions) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsCondition_entity_1.ChatSettingsCondition)
            .values(conditions)
            .execute();
    }
    async insertBusinessDays(businessDays) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsBusinessDays_entity_1.ChatSettingsBusinessDays)
            .values(businessDays)
            .execute();
    }
    async insertOperators(operators) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsOperator_entity_1.ChatSettingsOperator)
            .values(operators)
            .execute();
    }
    async updateRules(channelId, rules) {
        console.log(channelId, 'channelId');
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(chatSettingsRule_entity_1.ChatSettingsRule)
            .where('channel = :channelId', { channelId })
            .execute();
        console.log(7);
        console.log(rules);
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsRule_entity_1.ChatSettingsRule)
            .values(rules)
            .execute();
        console.log(8);
    }
    async updateBusinessDays(channelId, businessDays) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(chatSettingsBusinessDays_entity_1.ChatSettingsBusinessDays)
            .where('channel = :channelId', { channelId })
            .execute();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsBusinessDays_entity_1.ChatSettingsBusinessDays)
            .values(businessDays)
            .execute();
    }
    async updateOperators(channelId, operators) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(chatSettingsOperator_entity_1.ChatSettingsOperator)
            .where('channel = :channelId', { channelId })
            .execute();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(chatSettingsOperator_entity_1.ChatSettingsOperator)
            .values(operators)
            .execute();
    }
    async getChatSettings(projectId) {
        const row = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select('id, chat_settings_id')
            .from(channel_entity_1.Channel, 'channel')
            .where('project_id = :projectId', { projectId: parseInt(projectId) })
            .execute();
        const { id, chat_settings_id } = row[0];
        let generalChatSettings;
        if (chat_settings_id) {
            generalChatSettings = await typeorm_1.getConnection()
                .createQueryBuilder()
                .select(`
          "chatName", greeting, "backgroundImage", "buttonLocation",
          "buttonScale", "buttonText", "buttonWidth", "customCss", "infochatLinkEnabled",
          "requestText", "responseTimeText", timezone, "timeWithoutAnswer"
        `)
                .from(chatSettings_entity_1.ChatSettings, 'chatSettings')
                .where('id = :chat_settings_id', { chat_settings_id })
                .getRawOne();
        }
        else {
            generalChatSettings = {
                chatName: 'Чат на сайте',
                greeting: '',
                backgroundImage: 1,
                buttonLocation: 'right',
                buttonScale: '1',
                buttonText: '',
                buttonWidth: 0,
                infochatLinkEnabled: 1,
                customCss: '',
                responseTimeText: 'Автоматическое время ответа',
                requestText: 'Если клиент написал в нерабочие часы',
                timezone: 'Europe/Moscow',
            };
        }
        const businessDays = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select(`weekday, "timeFrom", "timeTo", "businessDayId"`)
            .from(chatSettingsBusinessDays_entity_1.ChatSettingsBusinessDays, 'businessDays')
            .where('channel_id = :channelId', { channelId: id })
            .execute();
        const operators = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select(`name, email`)
            .from(chatSettingsOperator_entity_1.ChatSettingsOperator, 'operators')
            .where('channel_id = :channelId', { channelId: id })
            .execute();
        const data = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select(`name, "isActivate", result, variant, operator, value, rule_id, condition.id`)
            .from(chatSettingsRule_entity_1.ChatSettingsRule, 'rule')
            .innerJoin(chatSettingsCondition_entity_1.ChatSettingsCondition, 'condition', 'condition.rule_id = rule.id')
            .where('channel_id = :channelId', { channelId: id })
            .execute();
        const rulesObject = data
            .reduce((acc, item) => {
            const rule = acc[item.rule_id];
            const condition = {
                id: item.id,
                variant: item.variant,
                operator: item.operator,
                value: item.value,
            };
            if (rule) {
                rule.conditions.push(condition);
            }
            else {
                acc[item.rule_id] = {
                    id: item.rule_id,
                    name: item.name,
                    isActivate: item.isActivate,
                    result: item.result,
                    conditions: [condition],
                };
            }
            return acc;
        }, {});
        const rules = [];
        for (const key in rulesObject) {
            rules.push(rulesObject[key]);
        }
        const formattedOperators = operators.map((operator) => ({
            id: operator.email,
            value: operator.name,
        }));
        console.log(generalChatSettings, 'generalChatSettings');
        return Object.assign(Object.assign({}, generalChatSettings), { businessDays, operators: formattedOperators, rules });
    }
};
ChatSettingsRepository = __decorate([
    typeorm_1.EntityRepository(chatSettings_entity_1.ChatSettings)
], ChatSettingsRepository);
exports.ChatSettingsRepository = ChatSettingsRepository;
//# sourceMappingURL=chatSettings.repository.js.map