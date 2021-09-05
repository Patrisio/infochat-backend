import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket
  } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class InboxGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('InboxGateway');

  @SubscribeMessage('reduceUnreadCountAnybody')
  reduceUnreadCountAnybody(client: Socket, payload: any): void {
    client.broadcast.emit('reduceUnreadCountAnybody', payload);
  }

  @SubscribeMessage('reduceOpenedToAnybody')
  reduceOpenedToAnybody(client: Socket, payload: any): void {
    client.broadcast.emit('reduceOpenedToAnybody', payload);
  }

  @SubscribeMessage('updateAssignedToAnybody')
  updateAssignedToAnybody(client: Socket, payload: any): void {
    client.broadcast.emit('updateAssignedToAnybody', payload);
  }

  @SubscribeMessage('updateTeammateOnlineStatus')
  updateTeammateOnlineStatus(client: Socket, payload: any): void {
    client.broadcast.emit('updateTeammateOnlineStatus', payload);
  }

  @SubscribeMessage('setActiveTeammateStatus')
  setActiveTeammateStatus(client: Socket, payload: any): void {
    client.broadcast.emit('setActiveTeammateStatus', payload);
  }

  @SubscribeMessage('changeMessagesStatus')
  changeMessagesStatus(client: Socket, payload: any): void {
    client.broadcast.emit('changeMessagesStatus', payload);
  }
  
  @SubscribeMessage('remapDialogsToSelectedTeammate')
  remapDialogsToSelectedTeammate(client: Socket, payload: any): void {
    client.broadcast.emit('remapDialogsToSelectedTeammate', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}