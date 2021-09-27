declare type IMessagesHistory = {
    message: string;
    clientId: string;
    username: string;
};
interface IClient {
    projectId: string;
    clientId: string;
    messagesHistory: IMessagesHistory[];
}
export declare class AssignedDto {
    clientId: string;
    username: string;
    email: string;
    assignedClientIds: IClient[];
    assignedCount: number;
    unreadClientIds: IClient[];
    unreadCount: number;
    openedClientIds: IClient[];
    openedCount: number;
    closedClientIds: IClient[];
    closedCount: number;
}
export {};
