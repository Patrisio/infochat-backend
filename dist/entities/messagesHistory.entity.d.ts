import { BaseEntity } from 'typeorm';
import { Client } from './client.entity';
export declare class MessagesHistory extends BaseEntity {
    id: string;
    message: string;
    username: string;
    timestamp: Date;
    client: Client;
}
