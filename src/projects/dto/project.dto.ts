import { IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  email: string;

  @IsString()
  name: string

  @IsString()
  timezone: string
}