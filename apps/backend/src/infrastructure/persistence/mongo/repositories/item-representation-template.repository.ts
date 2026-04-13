import { ItemRepresentationTemplateRepository } from '../../../../domain/item/repository';
import {
  ItemRepresentationTemplate,
  CreateItemRepresentationTemplateInput,
  UpdateItemRepresentationTemplateInput,
} from '../../../../domain/item/entity';
import { ItemRepresentationTemplateModel } from '../models/item-representation-template.model';
import { ItemRepresentationTemplateMapper } from '../mappers/item.mapper';

export class MongoItemRepresentationTemplateRepository implements ItemRepresentationTemplateRepository {
  async findById(id: string): Promise<ItemRepresentationTemplate | null> {
    const doc = await ItemRepresentationTemplateModel.findById(id);
    return doc ? ItemRepresentationTemplateMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<ItemRepresentationTemplate[]> {
    const docs = await ItemRepresentationTemplateModel.find();
    return docs.map(ItemRepresentationTemplateMapper.toDomain);
  }

  async create(input: CreateItemRepresentationTemplateInput): Promise<ItemRepresentationTemplate> {
    const doc = await ItemRepresentationTemplateModel.create(input);
    return ItemRepresentationTemplateMapper.toDomain(doc);
  }

  async update(
    id: string,
    input: UpdateItemRepresentationTemplateInput,
  ): Promise<ItemRepresentationTemplate | null> {
    const doc = await ItemRepresentationTemplateModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    return doc ? ItemRepresentationTemplateMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemRepresentationTemplateModel.findByIdAndDelete(id);
    return result !== null;
  }
}
