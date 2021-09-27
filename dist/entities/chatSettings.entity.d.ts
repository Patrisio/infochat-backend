import { BaseEntity } from 'typeorm';
export declare class ChatSettings extends BaseEntity {
    id: number;
    chatName?: string;
    greeting?: string;
    backgroundImage?: number;
    buttonLocation?: string;
    buttonScale?: string;
    buttonWidth?: number;
    buttonText?: string;
    infochatLinkEnabled?: number;
    customCss?: string;
    timezone?: string;
    requestText?: string;
    responseTimeText?: string;
    timeWithoutAnswer?: number;
}
