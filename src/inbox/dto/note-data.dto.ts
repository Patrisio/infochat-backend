import { IsString } from 'class-validator';

export class NoteDataDto {
  @IsString()
  text: string;

  @IsString()
  madeBy: string;
}