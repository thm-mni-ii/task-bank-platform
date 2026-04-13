import { ItemContentRepository } from '../../../../domain/item-content/repository';
import {
  ItemContent,
  CreateItemContentInput,
  UpdateItemContentInput,
} from '../../../../domain/item-content/entity';
import { ItemContentModel } from '../models/item-content.model';
import { ItemContentMapper } from '../mappers/item-content.mapper';

export class MongoItemContentRepository implements ItemContentRepository {
  async findById(id: string): Promise<ItemContent | null> {
    const doc = await ItemContentModel.findById(id);
    return doc ? ItemContentMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<ItemContent[]> {
    const docs = await ItemContentModel.find();
    return docs.map(ItemContentMapper.toDomain);
  }

  async create(input: CreateItemContentInput): Promise<ItemContent> {
    const doc = await ItemContentModel.create(input);
    return ItemContentMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateItemContentInput): Promise<ItemContent | null> {
    const doc = await ItemContentModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ItemContentMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemContentModel.findByIdAndDelete(id);
    return result !== null;
  }
}
