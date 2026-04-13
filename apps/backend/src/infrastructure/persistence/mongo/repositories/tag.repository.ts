import { TagRepository } from '../../../../domain/tag/repository';
import { Tag, CreateTagInput, UpdateTagInput } from '../../../../domain/tag/entity';
import { TagModel } from '../models/tag.model';
import { TagMapper } from '../mappers/tag.mapper';

export class MongoTagRepository implements TagRepository {
  async findById(id: string): Promise<Tag | null> {
    const doc = await TagModel.findById(id);
    return doc ? TagMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Tag[]> {
    const docs = await TagModel.find();
    return docs.map(TagMapper.toDomain);
  }

  async findByParentId(parentTagId: string | null): Promise<Tag[]> {
    const docs = await TagModel.find({ parentTagId });
    return docs.map(TagMapper.toDomain);
  }

  async create(input: CreateTagInput): Promise<Tag> {
    const doc = await TagModel.create(input);
    return TagMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateTagInput): Promise<Tag | null> {
    const doc = await TagModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? TagMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TagModel.findByIdAndDelete(id);
    return result !== null;
  }
}
