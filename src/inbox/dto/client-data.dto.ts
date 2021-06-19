import { IsString } from 'class-validator';

export class ClientDataDto {
  @IsString()
  updatedBy: string;

  @IsString()
  assignedTo?: string;

  @IsString()
  avatarName?: string;

  @IsString()
  email?: string;

  @IsString()
  phone?: string;
}