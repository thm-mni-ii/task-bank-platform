import { ModifierRepository } from '../../../../domain/modifier/repository';
import {
  Modifier,
  CreateModifierInput,
  UpdateModifierInput,
} from '../../../../domain/modifier/entity';
import { ModifierModel } from '../models/modifier.model';
import { ModifierMapper } from '../mappers/modifier.mapper';

export class MongoModifierRepository implements ModifierRepository {
  async findById(id: string): Promise<Modifier | null> {
    const doc = await ModifierModel.findById(id);
    return doc ? ModifierMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Modifier[]> {
    const docs = await ModifierModel.find();
    return docs.map(ModifierMapper.toDomain);
  }

  async create(input: CreateModifierInput): Promise<Modifier> {
    const doc = await ModifierModel.create(input);
    return ModifierMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateModifierInput): Promise<Modifier | null> {
    const doc = await ModifierModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ModifierMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ModifierModel.findByIdAndDelete(id);
    return result !== null;
  }
}
