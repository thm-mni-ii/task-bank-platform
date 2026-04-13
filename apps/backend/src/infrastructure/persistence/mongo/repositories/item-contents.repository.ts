import { ItemContentsRepository } from '../../../../domain/item-content/repository';
import {
  ItemContents,
  CreateItemContentsInput,
  UpdateItemContentsInput,
} from '../../../../domain/item-content/entity';
import { ItemContentsModel } from '../models/item-contents.model';
import { ItemContentsMapper } from '../mappers/item-content.mapper';

export class MongoItemContentsRepository implements ItemContentsRepository {
  async findAll(): Promise<ItemContents[]> {
    const docs = await ItemContentsModel.find();
    return docs.map(ItemContentsMapper.toDomain);
  }

  async findById(id: string): Promise<ItemContents | null> {
    const doc = await ItemContentsModel.findById(id);
    return doc ? ItemContentsMapper.toDomain(doc) : null;
  }

  async findByItemId(itemId: string): Promise<ItemContents[]> {
    const docs = await ItemContentsModel.find({ itemId });
    return docs.map(ItemContentsMapper.toDomain);
  }

  async findByMaterialId(itemMaterialId: string): Promise<ItemContents[]> {
    const docs = await ItemContentsModel.find({ itemMaterialId });
    return docs.map(ItemContentsMapper.toDomain);
  }

  async create(input: CreateItemContentsInput): Promise<ItemContents> {
    const doc = await ItemContentsModel.create(input);
    return ItemContentsMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateItemContentsInput): Promise<ItemContents | null> {
    const doc = await ItemContentsModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ItemContentsMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemContentsModel.findByIdAndDelete(id);
    return result !== null;
  }

  async deleteAllByItemId(itemId: string): Promise<number> {
    const result = await ItemContentsModel.deleteMany({ itemId });
    return result.deletedCount;
  }
}
