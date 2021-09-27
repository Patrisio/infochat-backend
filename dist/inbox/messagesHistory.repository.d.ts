import { Repository } from 'typeorm';
import { MessagesHistory } from '../entities/messagesHistory.entity';
export declare class MessagesHistoryRepository extends Repository<MessagesHistory> {
    getMessagesHistory(clientDto: any): Promise<{
        id: any;
        clientId: string;
        projectId: string;
        messagesHistory: any;
        isBlocked: any;
    }>;
    addMessage(newMessage: any, clientId: any): Promise<void>;
}
