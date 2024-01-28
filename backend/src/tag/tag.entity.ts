import { Entity, Column, ManyToOne, JoinColumn} from "typeorm";

import { BaseEntity } from "../base/base.entity";
import { Note } from "../note/note.entity";

@Entity("tags")
export class Tag extends BaseEntity {
  @Column({
    type: 'varchar',
    default: 'tag'
  })
  name: string;

  @Column({
    type: 'number',
    name: 'noteId'
  })
  noteId: number;

  @ManyToOne(() => Note, (note) => note.tags)
  @JoinColumn({
    name: 'noteId'
  })
  note: Note;
}