import { BaseEntity } from 'typeorm';
export declare class ChangesHistory extends BaseEntity {
    id: number;
    before: string;
    after: string;
    changeInFieldValue: string;
    timestamp: Date;
    client: string;
}
