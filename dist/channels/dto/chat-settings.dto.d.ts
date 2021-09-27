interface Operator {
    id: string;
    value: string;
}
interface BusinessDay {
    businessDayId: string;
    timeFrom: string;
    timeTo: string;
    weekday: string;
}
interface Condition {
    id: string;
    variant: string;
    operator: string;
    value: string;
}
interface Rule {
    id: string;
    name: string;
    isActivate: boolean;
    conditions: Condition[];
    result: string;
}
export declare class ChatSettingsDto {
    chatName?: string;
    greeting?: string;
    backgroundImage?: number;
    buttonLocation?: string;
    buttonScale?: string;
    buttonWidth?: number;
    buttonText?: string;
    infochatLinkEnabled?: number;
    customCss?: string;
    timezone: string;
    operators?: Operator[];
    businessDays?: BusinessDay[];
    requestText?: string;
    responseTimeText?: string;
    rules?: Rule[];
    timeWithoutAnswer?: number;
}
export {};
