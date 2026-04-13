import { CrudRepository } from '../common/types';
import {
  ItemCollection,
  CreateItemCollectionInput,
  UpdateItemCollectionInput,
  ItemCollectionSubItem,
  CreateItemCollectionSubItemInput,
  UpdateItemCollectionSubItemInput,
} from './entity';

export type ItemCollectionRepository = CrudRepository<
  ItemCollection,
  CreateItemCollectionInput,
  UpdateItemCollectionInput
>;

export interface ItemCollectionSubItemRepository {
  findByCollectionId(itemCollectionId: string): Promise<ItemCollectionSubItem[]>;
  findBySubitemId(subitemId: string): Promise<ItemCollectionSubItem[]>;
  create(input: CreateItemCollectionSubItemInput): Promise<ItemCollectionSubItem>;
  update(
    itemCollectionId: string,
    subitemId: string,
    input: UpdateItemCollectionSubItemInput,
  ): Promise<ItemCollectionSubItem | null>;
  delete(itemCollectionId: string, subitemId: string): Promise<boolean>;
  deleteAllByCollectionId(itemCollectionId: string): Promise<number>;
}
