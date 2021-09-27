import { InboxService } from './inbox.service';
import { MessageDto } from './dto/message.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';
import { MessageStatusDto } from './dto/message-status.dto';
import { NoteDataDto } from './dto/note-data.dto';
export declare class InboxController {
    private inboxService;
    constructor(inboxService: InboxService);
    getMessagesHistory(projectId: any, clientId: any): Promise<{
        id: any;
        clientId: string;
        projectId: string;
        messagesHistory: any;
        isBlocked: any;
    }>;
    getWidgetScript(res: any, projectId: any): void;
    getMessagesHistoryByProjectId(projectId: any): Promise<any>;
    addMessage(messageDto: MessageDto): Promise<{
        code: number;
        status: string;
    }>;
    deleteClientAppealByClientId(projectId: string, clientId: string): Promise<{
        statusCode: number;
    }>;
    updateMessagesStatusByClientId(projectId: string, clientId: string, messagesStatusDto: MessageStatusDto): Promise<{
        code: number;
        status: string;
    }>;
    addChannel(channel: ChannelDto, projectId: any): Promise<{
        code: number;
        status: string;
    }>;
    update(projectId: string, clientId: string, clientData: ClientDataDto): Promise<{
        code: number;
        status: string;
    }>;
    addNote(clientId: string, noteData: NoteDataDto): Promise<{
        statusCode: number;
        timestamp: any;
        id: any;
    }>;
    deleteNote(id: {
        id: number;
    }): Promise<{
        statusCode: number;
    }>;
    getUserInfo(projectId: string, clientId: string): Promise<{
        changesHistory: any;
        notes: any;
    }>;
    getChannels(projectId: string): Promise<{
        statusCode: number;
        data: any;
    }>;
    remapDialogsToSelectedTeammate(projectId: string, teammatesEmails: {
        deletedTeammateEmail: string;
        teammateEmailForRemapDialogs: string;
    }): Promise<{
        code: number;
        status: string;
    }>;
}
