import { IsString } from 'class-validator';

export class TeammateDataDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  oldEmail: string;

  @IsString()
  password: string;

  @IsString()
  timezone: string;
}