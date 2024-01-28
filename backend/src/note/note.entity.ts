import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../user/user.entity";

import { BaseEntity } from "../base/base.entity";
import { Category } from "../category/category.entity";
import { Tag } from "../tag/tag.entity";

@Entity("notes")
export class Note extends BaseEntity {
  @Column({
    type: "varchar",
    default: "Agrega un titulo",
  })
  title: string;

  @Column({
    type: "varchar",
    default: "Agrega una descripcion",
  })
  description: string;

  @Column({
    type: "date"
  })
  date: Date;

  @Column({
    type: "bool",
    default: false,
  })
  isArchived: boolean;

  @Column({
    type: "bool",
    default: true,
  })
  isActive: boolean;

  @Column({
    type: "number",
    nullable: true,
    name: 'categoryId'
  })
  categoryId: number;

  @Column({
    type: "number",
    name: 'userId'
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({
    name: 'userId'
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.notes)
  @JoinColumn({
    name: 'categoryId'
  })
  category: Category;

  @OneToMany(() => Tag, (tag) => tag.note)
  tags: Tag[]
}
