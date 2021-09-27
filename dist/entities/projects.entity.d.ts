import { BaseEntity } from 'typeorm';
import { Channel } from './channel.entity';
import { Template } from './template.entity';
import { User } from './user.entity';
export declare class Project extends BaseEntity {
    id: number;
    name: string;
    timezone: string;
    channels: Channel[];
    templates: Template[];
    client: Template[];
    users: User[];
    project: Project[];
}
