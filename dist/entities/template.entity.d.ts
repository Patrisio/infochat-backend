import { BaseEntity } from 'typeorm';
export declare class Template extends BaseEntity {
    id: string;
    name: string;
    message: string;
    project: number;
}
