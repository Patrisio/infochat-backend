import { BaseEntity } from 'typeorm';
import { MessagesHistory } from './messagesHistory.entity';
import { ChangesHistory } from './changesHistory.entity';
import { Note } from './note.entity';
declare type MessagesStatus = 'unread' | 'assigned' | 'opened' | 'closed';
export declare class Client extends BaseEntity {
    id: string;
    assignedTo: string;
    avatarName: string;
    avatarColor: string;
    phone: string;
    email: string;
    messagesStatus: MessagesStatus;
    isBlocked: boolean;
    createdAt: Date;
    project: number;
    messages_history: MessagesHistory[];
    changesHistory: ChangesHistory[];
    note: Note[];
}
export {};
