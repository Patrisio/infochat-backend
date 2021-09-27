import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { MessageStatusDto } from './dto/message-status.dto';
import { ClientDataDto } from './dto/client-data.dto';
export declare class ClientRepository extends Repository<Client> {
    findDuplicateByClientId(clientId: any): Promise<Client>;
    getClientInfo(projectId: any, clientId: any): Promise<{
        changesHistory: any;
        notes: any[];
    }>;
    deleteClientAppealByClientId(projectId: number, clientId: string): Promise<{
        statusCode: number;
    }>;
    getMessagesHistoryByProjectId(projectId: any): Promise<any>;
    addClientData(messageDto: any): Promise<void>;
    updateMessagesStatusByClientId(projectId: number, clientId: string, messagesStatusDto: MessageStatusDto): Promise<{
        code: number;
        status: string;
    }>;
    updateClientData(projectId: number, clientId: string, clientDataDto: ClientDataDto): Promise<{
        code: number;
        status: string;
    }>;
    remapDialogsToSelectedTeammate(projectId: number, teammatesEmails: any): Promise<{
        code: number;
        status: string;
    }>;
}
