import { BaseEntity } from 'typeorm';
export declare class Tariff extends BaseEntity {
    id: number;
    operatorsCount: number;
    chatCount: number;
    templatesCount: number;
    infochatLinkCount: number;
    project: number;
}
