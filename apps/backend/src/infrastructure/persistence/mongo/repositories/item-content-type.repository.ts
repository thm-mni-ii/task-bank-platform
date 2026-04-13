import { ItemContentTypeRepository } from '../../../../domain/item-content-type/repository';
import {
  ItemContentType,
  CreateItemContentTypeInput,
  UpdateItemContentTypeInput,
} from '../../../../domain/item-content-type/entity';
import { ItemContentTypeModel } from '../models/item-content-type.model';
import { ItemContentTypeMapper } from '../mappers/item-content-type.mapper';

export class MongoItemContentTypeRepository implements ItemContentTypeRepository {
  async findById(id: string): Promise<ItemContentType | null> {
    const doc = await ItemContentTypeModel.findById(id);
    return doc ? ItemContentTypeMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<ItemContentType[]> {
    const docs = await ItemContentTypeModel.find();
    return docs.map(ItemContentTypeMapper.toDomain);
  }

  async create(input: CreateItemContentTypeInput): Promise<ItemContentType> {
    const doc = await ItemContentTypeModel.create(input);
    return ItemContentTypeMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateItemContentTypeInput): Promise<ItemContentType | null> {
    const doc = await ItemContentTypeModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ItemContentTypeMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemContentTypeModel.findByIdAndDelete(id);
    return result !== null;
  }
}
