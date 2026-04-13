import { ItemCollectionRepository } from '../../../../domain/item-collection/repository';
import {
  ItemCollection,
  CreateItemCollectionInput,
  UpdateItemCollectionInput,
} from '../../../../domain/item-collection/entity';
import { ItemCollectionModel } from '../models/item-collection.model';
import { ItemCollectionMapper } from '../mappers/item-collection.mapper';

export class MongoItemCollectionRepository implements ItemCollectionRepository {
  async findById(id: string): Promise<ItemCollection | null> {
    const doc = await ItemCollectionModel.findById(id);
    return doc ? ItemCollectionMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<ItemCollection[]> {
    const docs = await ItemCollectionModel.find();
    return docs.map(ItemCollectionMapper.toDomain);
  }

  async create(input: CreateItemCollectionInput): Promise<ItemCollection> {
    const doc = await ItemCollectionModel.create(input);
    return ItemCollectionMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateItemCollectionInput): Promise<ItemCollection | null> {
    const doc = await ItemCollectionModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ItemCollectionMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemCollectionModel.findByIdAndDelete(id);
    return result !== null;
  }
}
