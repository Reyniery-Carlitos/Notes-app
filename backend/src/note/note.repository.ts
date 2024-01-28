import { Note } from './note.entity';
import { BaseRepository } from '../base/base.repository';

export class NoteRepository extends BaseRepository<Note> {
  constructor() {
    super(Note);
  }
}