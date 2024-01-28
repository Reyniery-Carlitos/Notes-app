import { Category } from './category.entity';
import { BaseRepository } from '../base/base.repository';

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category);
  }
}