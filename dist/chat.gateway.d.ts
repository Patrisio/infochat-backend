import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleMessage(client: Socket, payload: any): void;
    handleOperatorMessageFromInfochat(client: Socket, payload: {
        room: string;
        message: string;
    }): void;
    handleRoomJoin(client: Socket, room: string): void;
    handleTransferChatSettings(client: Socket, payload: {
        room: string;
        chatSettings: any;
    }): void;
    blockOrUnblockClient(client: Socket, payload: {
        room: string;
    }): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
