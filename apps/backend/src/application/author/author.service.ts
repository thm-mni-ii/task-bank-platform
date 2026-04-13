import { AuthorRepository } from '../../domain/author/repository';
import { Author, CreateAuthorInput, UpdateAuthorInput } from '../../domain/author/entity';
import { NotFoundError } from '../../shared/errors';

export class AuthorService {
  constructor(private readonly authorRepo: AuthorRepository) {}

  async findById(id: string): Promise<Author> {
    const author = await this.authorRepo.findById(id);
    if (!author) throw new NotFoundError('Author', id);
    return author;
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepo.findAll();
  }

  async create(input: CreateAuthorInput): Promise<Author> {
    return this.authorRepo.create(input);
  }

  async update(id: string, input: UpdateAuthorInput): Promise<Author> {
    const author = await this.authorRepo.update(id, input);
    if (!author) throw new NotFoundError('Author', id);
    return author;
  }

  async delete(id: string): Promise<boolean> {
    return this.authorRepo.delete(id);
  }
}
