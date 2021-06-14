import { IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

interface Operator {
  id: string,
  value: string,
}

interface BusinessDay {
  businessDayId: string,
  timeFrom: string,
  timeTo: string,
  weekday: string,
}

interface Condition {
  id: string,
  variant: string,
  operator: string,
  value: string,
}

interface Rule {
  id: string,
  name: string,
  isActivate: boolean,
  conditions: Condition[],
  result: string,
}

export class ChatSettingsDto {
  @IsString()
  chatName?: string;

  @IsString()
  greeting?: string

  @IsString()
  backgroundImage?: number

  @IsString()
  buttonLocation?: string;

  @IsString()
  buttonScale?: string

  @IsNumber()
  buttonWidth?: number

  @IsString()
  buttonText?: string

  @IsBoolean()
  infochatLinkEnabled?: number

  @IsString()
  customCss?: string

  @IsString()
  timezone: string

  @IsArray()
  operators?: Operator[]

  @IsArray()
  businessDays?: BusinessDay[]

  @IsString()
  requestText?: string

  @IsString()
  responseTimeText?: string

  @IsArray()
  rules?: Rule[]

  @IsNumber()
  timeWithoutAnswer?: number
}