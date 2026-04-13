import { ItemRepository } from '../../../../domain/item/repository';
import { Item, CreateItemInput, UpdateItemInput } from '../../../../domain/item/entity';
import { ItemModel } from '../models/item.model';
import { ItemMapper } from '../mappers/item.mapper';

export class MongoItemRepository implements ItemRepository {
  async findById(id: string): Promise<Item | null> {
    const doc = await ItemModel.findById(id);
    return doc ? ItemMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Item[]> {
    const docs = await ItemModel.find();
    return docs.map(ItemMapper.toDomain);
  }

  async findByRootItemId(rootItemId: string): Promise<Item[]> {
    const docs = await ItemModel.find({ rootItemId });
    return docs.map(ItemMapper.toDomain);
  }

  async create(input: CreateItemInput): Promise<Item> {
    const doc = await ItemModel.create(input);
    return ItemMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateItemInput): Promise<Item | null> {
    const doc = await ItemModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ItemMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemModel.findByIdAndDelete(id);
    return result !== null;
  }
}
