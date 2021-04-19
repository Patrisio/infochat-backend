import { IsString } from 'class-validator';

export class ClientDto {
  @IsString()
  clientId: string;

  @IsString()
  projectId: string;
}