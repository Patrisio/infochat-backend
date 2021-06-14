import { IsString } from 'class-validator';

type MessagesStatus = 'unread' | 'assigned' | 'opened' | 'closed';

export class MessageStatusDto {
  @IsString()
  assignedTo?: string;

  @IsString()
  messagesStatus: MessagesStatus;
}