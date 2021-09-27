import { MessagesHistoryRepository } from './messagesHistory.repository';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../auth/user.repository';
import { NoteRepository } from './note.repository';
import { ClientRepository } from './client.repository';
import { ChangesHistoryRepository } from './changesHistory.repository';
import { MessageDto } from './dto/message.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';
import { MessageStatusDto } from './dto/message-status.dto';
import { NoteDataDto } from './dto/note-data.dto';
export declare class InboxService {
    private messagesHistoryRepository;
    private userRepository;
    private channelRepository;
    private clientRepository;
    private changesHistoryRepository;
    private noteRepository;
    constructor(messagesHistoryRepository: MessagesHistoryRepository, userRepository: UserRepository, channelRepository: ChannelRepository, clientRepository: ClientRepository, changesHistoryRepository: ChangesHistoryRepository, noteRepository: NoteRepository);
    addMessage(messageDto: MessageDto): Promise<{
        code: number;
        status: string;
    }>;
    deleteClientAppealByClientId(projectId: number, clientId: string): Promise<{
        statusCode: number;
    }>;
    updateMessagesStatusByClientId(projectId: number, clientId: string, messagesStatusDto: MessageStatusDto): Promise<{
        code: number;
        status: string;
    }>;
    getMessagesHistory(clientDto: any): Promise<{
        id: any;
        clientId: string;
        projectId: string;
        messagesHistory: any;
        isBlocked: any;
    }>;
    getMessagesHistoryByProjectId(projectId: any): Promise<any>;
    getClientInfo(projectId: number, clientId: string): Promise<{
        changesHistory: any;
        notes: any;
    }>;
    update(projectId: number, clientId: string, clientDataDto: ClientDataDto): Promise<{
        code: number;
        status: string;
    }>;
    addChannel(channel: ChannelDto, projectId: number): Promise<{
        code: number;
        status: string;
    }>;
    getChannels(projectId: number): Promise<{
        statusCode: number;
        data: any;
    }>;
    addNote(clientId: string, noteDataDto: NoteDataDto): Promise<{
        statusCode: number;
        timestamp: any;
        id: any;
    }>;
    deleteNote(noteId: number): Promise<{
        statusCode: number;
    }>;
    remapDialogsToSelectedTeammate(projectId: number, teammatesEmails: any): Promise<{
        code: number;
        status: string;
    }>;
}
