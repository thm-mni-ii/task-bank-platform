import { AuthorRepository } from '../../../../domain/author/repository';
import { Author, CreateAuthorInput, UpdateAuthorInput } from '../../../../domain/author/entity';
import { AuthorModel } from '../models/author.model';
import { AuthorMapper } from '../mappers/author.mapper';

export class MongoAuthorRepository implements AuthorRepository {
  async findById(id: string): Promise<Author | null> {
    const doc = await AuthorModel.findById(id);
    return doc ? AuthorMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Author[]> {
    const docs = await AuthorModel.find();
    return docs.map(AuthorMapper.toDomain);
  }

  async create(input: CreateAuthorInput): Promise<Author> {
    const doc = await AuthorModel.create(input);
    return AuthorMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateAuthorInput): Promise<Author | null> {
    const doc = await AuthorModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? AuthorMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await AuthorModel.findByIdAndDelete(id);
    return result !== null;
  }
}
