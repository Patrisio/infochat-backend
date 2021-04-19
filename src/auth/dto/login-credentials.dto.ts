import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}