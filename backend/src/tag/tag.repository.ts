import { Tag } from './tag.entity';
import { BaseRepository } from '../base/base.repository';

export class TagRepository extends BaseRepository<Tag> {
  constructor() {
    super(Tag);
  }
}