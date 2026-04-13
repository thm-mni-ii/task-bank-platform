import { CrudRepository } from '../common/types';
import { Tag, CreateTagInput, UpdateTagInput, ItemTag, ItemContentTag } from './entity';

export type TagRepository = CrudRepository<Tag, CreateTagInput, UpdateTagInput> & {
  findByParentId(parentTagId: string | null): Promise<Tag[]>;
};

export interface ItemTagRepository {
  findByItemId(itemId: string): Promise<ItemTag[]>;
  findByTagId(tagId: string): Promise<ItemTag[]>;
  create(input: ItemTag): Promise<ItemTag>;
  delete(itemId: string, tagId: string): Promise<boolean>;
  deleteAllByItemId(itemId: string): Promise<number>;
}

export interface ItemContentTagRepository {
  findByItemId(itemId: string): Promise<ItemContentTag[]>;
  findByTagId(tagId: string): Promise<ItemContentTag[]>;
  create(input: ItemContentTag): Promise<ItemContentTag>;
  delete(itemId: string, tagId: string): Promise<boolean>;
  deleteAllByItemId(itemId: string): Promise<number>;
}
