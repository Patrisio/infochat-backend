"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const note_entity_1 = require("../entities/note.entity");
let NoteRepository = class NoteRepository extends typeorm_1.Repository {
    async getNotes(clientId) {
        try {
            const notes = await typeorm_1.getConnection()
                .createQueryBuilder()
                .select('id, text, "madeBy", timestamp')
                .from(note_entity_1.Note, 'note')
                .where('client_id = :clientId', { clientId })
                .execute();
            for (let i = 0; i < notes.length; i++) {
                const note = notes[i];
                note.timestamp = Date.parse(note.timestamp);
            }
            return notes;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async addNote(clientId, noteDataDto) {
        try {
            const insertedNote = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(note_entity_1.Note)
                .values(Object.assign(Object.assign({}, noteDataDto), { client: clientId }))
                .execute();
            const timestamp = insertedNote.raw[0].timestamp;
            const id = insertedNote.raw[0].id;
            return {
                statusCode: 200,
                timestamp,
                id,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteNote(noteId) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(note_entity_1.Note)
                .where({ id: noteId })
                .execute();
            return {
                statusCode: 200,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
NoteRepository = __decorate([
    typeorm_1.EntityRepository(note_entity_1.Note)
], NoteRepository);
exports.NoteRepository = NoteRepository;
//# sourceMappingURL=note.repository.js.map