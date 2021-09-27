import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { NoteDataDto } from './dto/note-data.dto';
export declare class NoteRepository extends Repository<Note> {
    getNotes(clientId: string): Promise<any>;
    addNote(clientId: string, noteDataDto: NoteDataDto): Promise<{
        statusCode: number;
        timestamp: any;
        id: any;
    }>;
    deleteNote(noteId: number): Promise<{
        statusCode: number;
    }>;
}
