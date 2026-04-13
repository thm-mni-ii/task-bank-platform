import { CrudRepository } from '../common/types';
import {
  ItemContent,
  CreateItemContentInput,
  UpdateItemContentInput,
  ItemContents,
  CreateItemContentsInput,
  UpdateItemContentsInput,
} from './entity';

export type ItemContentRepository = CrudRepository<
  ItemContent,
  CreateItemContentInput,
  UpdateItemContentInput
>;

export interface ItemContentsRepository {
  findAll(): Promise<ItemContents[]>;
  findById(id: string): Promise<ItemContents | null>;
  findByItemId(itemId: string): Promise<ItemContents[]>;
  findByMaterialId(itemMaterialId: string): Promise<ItemContents[]>;
  create(input: CreateItemContentsInput): Promise<ItemContents>;
  update(id: string, input: UpdateItemContentsInput): Promise<ItemContents | null>;
  delete(id: string): Promise<boolean>;
  deleteAllByItemId(itemId: string): Promise<number>;
}
