import { DataSource } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { User } from './user/user.entity';
import { Note } from './note/note.entity';
import { Category } from './category/category.entity';
import { Tag } from './tag/tag.entity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3306,
  username: process.env.DB_USERNAME ?? 'root',
  database: process.env.DB_DATABASE ?? 'APP_NOTES',
  password: process.env.DB_PASSWORD ?? 'maria_DB_passw0rd',
  synchronize: true,
  entities: [BaseEntity, User, Note, Category, Tag]
});

export async function connect (): Promise<DataSource> {
  await dataSource.initialize();

  console.log('Connected to MySQL database');

  return dataSource;
}