import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { ChatSettings } from '../entities/chatSettings.entity';
import { ChatSettingsRule } from '../entities/chatSettingsRule.entity';
import { ChatSettingsCondition } from '../entities/chatSettingsCondition.entity';
import { ChatSettingsOperator } from '../entities/chatSettingsOperator.entity';
import { ChatSettingsBusinessDays } from '../entities/chatSettingsBusinessDays.entity';
import { Channel } from '../entities/channel.entity';
import { ChatSettingsDto } from './dto/chat-settings.dto';

@EntityRepository(ChatSettings)
export class ChatSettingsRepository extends Repository<ChatSettings> {
  async saveChatSettings(chatSettingsDto: ChatSettingsDto, projectId: string) {
    const {
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
      timeWithoutAnswer = 10,
    } = chatSettingsDto;
    console.log(chatSettingsDto);

    try {
      const row = await getConnection()
        .createQueryBuilder()
        .select('id, chat_settings_id')
        .from(Channel, 'channel')
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
        await getConnection()
          .createQueryBuilder()
          .update(ChatSettings)
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
      } else {
        const insertedChatSettingsRow = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(ChatSettings)
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

        await getConnection()
          .createQueryBuilder()
          .update(Channel)
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
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async insertRules(rules) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsRule)
      .values(rules)
      .execute();
  }

  async insertConditions(conditions) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsCondition)
      .values(conditions)
      .execute();
  }

  async insertBusinessDays(businessDays) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsBusinessDays)
      .values(businessDays)
      .execute();
  }

  async insertOperators(operators) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsOperator)
      .values(operators)
      .execute();
  }

  async updateRules(channelId: number, rules) {
    console.log(channelId, 'channelId');
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ChatSettingsRule)
      .where('channel = :channelId', { channelId })
      .execute();
    console.log(7);
    console.log(rules);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsRule)
      .values(rules)
      .execute();
    console.log(8);
  }

  async updateBusinessDays(channelId: number, businessDays) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ChatSettingsBusinessDays)
      .where('channel = :channelId', { channelId })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsBusinessDays)
      .values(businessDays)
      .execute();
  }

  async updateOperators(channelId: number, operators) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ChatSettingsOperator)
      .where('channel = :channelId', { channelId })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatSettingsOperator)
      .values(operators)
      .execute();
  }

  async getChatSettings(projectId: string) {
    const row = await getConnection()
      .createQueryBuilder()
      .select('id, chat_settings_id')
      .from(Channel, 'channel')
      .where('project_id = :projectId', { projectId: parseInt(projectId) })
      .execute();

    const { id, chat_settings_id } = row[0];

    let generalChatSettings;

    if (chat_settings_id) {
      generalChatSettings = await getConnection()
        .createQueryBuilder()
        .select(`
          "chatName", greeting, "backgroundImage", "buttonLocation",
          "buttonScale", "buttonText", "buttonWidth", "customCss", "infochatLinkEnabled",
          "requestText", "responseTimeText", timezone, "timeWithoutAnswer"
        `)
        .from(ChatSettings, 'chatSettings')
        .where('id = :chat_settings_id', { chat_settings_id })
        .getRawOne()
    } else {
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

    const businessDays = await getConnection()
      .createQueryBuilder()
      .select(`weekday, "timeFrom", "timeTo", "businessDayId"`)
      .from(ChatSettingsBusinessDays, 'businessDays')
      .where('channel_id = :channelId', { channelId: id })
      .execute();

    const operators = await getConnection()
      .createQueryBuilder()
      .select(`name, email`)
      .from(ChatSettingsOperator, 'operators')
      .where('channel_id = :channelId', { channelId: id })
      .execute();

    const data = await getConnection()
      .createQueryBuilder()
      .select(`name, "isActivate", result, variant, operator, value, rule_id, condition.id`)
      .from(ChatSettingsRule, 'rule')
      .innerJoin(ChatSettingsCondition, 'condition', 'condition.rule_id = rule.id')
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
        } else {
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
    return {
      ...generalChatSettings,
      businessDays,
      operators: formattedOperators,
      rules,
    };
  }
}