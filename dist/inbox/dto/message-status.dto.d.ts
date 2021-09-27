declare type MessagesStatus = 'unread' | 'assigned' | 'opened' | 'closed';
export declare class MessageStatusDto {
    assignedTo?: string;
    messagesStatus: MessagesStatus;
}
export {};
