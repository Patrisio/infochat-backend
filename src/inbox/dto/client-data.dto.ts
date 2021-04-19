import { IsString } from 'class-validator';

export class ClientDataDto {
  @IsString()
  assigned_to: string;

  @IsString()
  avatarName: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}