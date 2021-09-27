import { BaseEntity } from 'typeorm';
export declare class Note extends BaseEntity {
    id: number;
    text: string;
    madeBy: string;
    timestamp: Date;
    client: string;
}
