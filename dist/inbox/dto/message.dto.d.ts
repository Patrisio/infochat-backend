interface IMessagesHistory {
    timestamp: number;
    username: string;
    message: string;
}
export declare class MessageDto {
    clientId: string;
    projectId: string;
    message: IMessagesHistory;
    avatarName: string;
    avatarColor: string;
}
export {};
