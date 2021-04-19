import { IsString } from 'class-validator';

export class ClientInfoDto {
  @IsString()
  clientId: string;
}