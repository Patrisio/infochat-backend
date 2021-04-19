import { IsString, IsNumber, IsPhoneNumber } from 'class-validator';

type IMessagesHistory = {
  message: string,
  clientId: string,
  username: string
};

interface IClient {
  projectId: string,
  clientId: string,
  messagesHistory: IMessagesHistory[],
}

export class AssignedDto {
  @IsString()
  clientId: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  assignedClientIds: IClient[];

  @IsNumber()
  assignedCount: number;

  unreadClientIds: IClient[];
  
  @IsNumber()
  unreadCount: number

  openedClientIds: IClient[];
  
  @IsNumber()
  openedCount: number

  closedClientIds: IClient[];
  
  @IsNumber()
  closedCount: number
}