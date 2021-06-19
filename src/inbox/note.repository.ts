import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Note } from '../entities/note.entity';
import { Client } from '../entities/client.entity';
import { NoteDataDto } from './dto/note-data.dto';


@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async getNotes(clientId: string) {
    try {
      const notes = await getConnection()
        .createQueryBuilder()
        .select('id, text, "madeBy", timestamp')
        .from(Note, 'note')
        .where('client_id = :clientId', { clientId })
        .execute();

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        note.timestamp = Date.parse(note.timestamp);
      }
    
      return notes;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async addNote(clientId: string, noteDataDto: NoteDataDto) {
    try {
      const insertedNote = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Note)
        .values({
          ...noteDataDto,
          client: clientId,
        })
        .execute();

      const timestamp = insertedNote.raw[0].timestamp;
      const id = insertedNote.raw[0].id;
      
        return {
          statusCode: 200,
          timestamp,
          id,
        };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteNote(noteId: number) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Note)
        .where({ id: noteId })
        .execute();

      return {
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}