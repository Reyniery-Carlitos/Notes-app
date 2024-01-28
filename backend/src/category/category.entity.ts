import { Entity, Column, OneToMany} from "typeorm";

import { BaseEntity } from "../base/base.entity";
import { Note } from "../note/note.entity";

@Entity("categories")
export class Category extends BaseEntity {
  @Column({
    type: "varchar",
    default: "Category"
  })
  name: string;

  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];
} 