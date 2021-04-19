import { IsString } from 'class-validator';

export class TeammateDto {
  @IsString()
  inviteId: string;

  @IsString()
  email: string;

  @IsString()
  projectId: string;

  role: string;

  status: string;

  username: string;
}