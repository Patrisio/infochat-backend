import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class InboxGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    updateTeammateOnlineStatus(client: Socket, payload: any): void;
    setActiveTeammateStatus(client: Socket, payload: any): void;
    changeMessagesStatus(client: Socket, payload: any): void;
    remapDialogsToSelectedTeammate(client: Socket, payload: any): void;
    updateIncomingMessage(client: Socket, payload: any): void;
    updateSelectedClient(client: Socket, payload: any): void;
    deleteFromInboxIncomingMessage(client: Socket, payload: any): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
