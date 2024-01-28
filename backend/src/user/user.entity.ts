import { Entity, Column, OneToMany } from "typeorm";

import { Note } from "../note/note.entity";
import { BaseEntity } from "../base/base.entity";

@Entity("users")
export class User extends BaseEntity {
  @Column({
    type: "varchar",
    unique: true,
  })
  email: string;

  @Column({
    name: "password",
  })
  password: string;

  @Column({
    type: "varchar",
    length: 100,
    name: "username",
  })
  username: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
