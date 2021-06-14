import { IsString } from 'class-validator';

export class TemplateDto {
  @IsString()
  name: string;

  @IsString()
  message: string;
}