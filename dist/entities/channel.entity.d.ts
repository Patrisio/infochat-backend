import { BaseEntity } from 'typeorm';
import { Project } from './projects.entity';
import { ChatSettingsOperator } from './chatSettingsOperator.entity';
import { ChatSettingsBusinessDays } from './chatSettingsBusinessDays.entity';
export declare class Channel extends BaseEntity {
    id: number;
    name: string;
    status: string;
    project: Project;
    chatSettingsId: number;
    operators: ChatSettingsOperator[];
    businessDays: ChatSettingsBusinessDays[];
}
