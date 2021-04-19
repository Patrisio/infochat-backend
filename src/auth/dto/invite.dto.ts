import { IsString, MinLength, MaxLength } from 'class-validator';

export class InviteDto {
  @IsString()
  projectId: string;
  
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}