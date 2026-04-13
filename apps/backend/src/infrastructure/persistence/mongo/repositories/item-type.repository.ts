import { ItemTypeRepository } from '../../../../domain/item-type/repository';
import {
  ItemType,
  CreateItemTypeInput,
  UpdateItemTypeInput,
} from '../../../../domain/item-type/entity';
import { ItemTypeModel } from '../models/item-type.model';
import { ItemTypeMapper } from '../mappers/item-type.mapper';

export class MongoItemTypeRepository implements ItemTypeRepository {
  async findById(id: string): Promise<ItemType | null> {
    const doc = await ItemTypeModel.findById(id);
    return doc ? ItemTypeMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<ItemType[]> {
    const docs = await ItemTypeModel.find();
    return docs.map(ItemTypeMapper.toDomain);
  }

  async create(input: CreateItemTypeInput): Promise<ItemType> {
    const doc = await ItemTypeModel.create(input);
    return ItemTypeMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateItemTypeInput): Promise<ItemType | null> {
    const doc = await ItemTypeModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ItemTypeMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemTypeModel.findByIdAndDelete(id);
    return result !== null;
  }
}
