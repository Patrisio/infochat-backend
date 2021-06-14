import { IsString } from 'class-validator';

interface IMessagesHistory {
  timestamp: number,
  username: string,
  message: string
}

export class MessageDto {
  @IsString()
  clientId: string;

  @IsString()
  projectId: string;

  message: IMessagesHistory;

  @IsString()
  avatarName: string;

  @IsString()
  avatarColor: string
}