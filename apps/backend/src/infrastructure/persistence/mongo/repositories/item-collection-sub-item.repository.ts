import { ItemCollectionSubItemRepository } from '../../../../domain/item-collection/repository';
import {
  ItemCollectionSubItem,
  CreateItemCollectionSubItemInput,
  UpdateItemCollectionSubItemInput,
} from '../../../../domain/item-collection/entity';
import { ItemCollectionSubItemModel } from '../models/item-collection-sub-item.model';
import { ItemCollectionSubItemMapper } from '../mappers/item-collection.mapper';

export class MongoItemCollectionSubItemRepository implements ItemCollectionSubItemRepository {
  async findByCollectionId(itemCollectionId: string): Promise<ItemCollectionSubItem[]> {
    const docs = await ItemCollectionSubItemModel.find({ itemCollectionId }).sort({
      position: 1,
    });
    return docs.map(ItemCollectionSubItemMapper.toDomain);
  }

  async findBySubitemId(subitemId: string): Promise<ItemCollectionSubItem[]> {
    const docs = await ItemCollectionSubItemModel.find({ subitemId });
    return docs.map(ItemCollectionSubItemMapper.toDomain);
  }

  async create(input: CreateItemCollectionSubItemInput): Promise<ItemCollectionSubItem> {
    const doc = await ItemCollectionSubItemModel.create(input);
    return ItemCollectionSubItemMapper.toDomain(doc);
  }

  async update(
    itemCollectionId: string,
    subitemId: string,
    input: UpdateItemCollectionSubItemInput,
  ): Promise<ItemCollectionSubItem | null> {
    const doc = await ItemCollectionSubItemModel.findOneAndUpdate(
      { itemCollectionId, subitemId },
      input,
      { new: true },
    );
    return doc ? ItemCollectionSubItemMapper.toDomain(doc) : null;
  }

  async delete(itemCollectionId: string, subitemId: string): Promise<boolean> {
    const result = await ItemCollectionSubItemModel.findOneAndDelete({
      itemCollectionId,
      subitemId,
    });
    return result !== null;
  }

  async deleteAllByCollectionId(itemCollectionId: string): Promise<number> {
    const result = await ItemCollectionSubItemModel.deleteMany({ itemCollectionId });
    return result.deletedCount;
  }
}
