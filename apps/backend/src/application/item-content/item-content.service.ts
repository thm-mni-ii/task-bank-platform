import {
  ItemContentRepository,
  ItemContentsRepository,
} from '../../domain/item-content/repository';
import {
  ItemContent,
  CreateItemContentInput,
  UpdateItemContentInput,
  ItemContents,
  CreateItemContentsInput,
  UpdateItemContentsInput,
} from '../../domain/item-content/entity';
import { NotFoundError, ReferentialIntegrityError } from '../../shared/errors';
import { AuthorRepository } from '../../domain/author/repository';
import { LicenseRepository } from '../../domain/license/repository';

export class ItemContentService {
  constructor(
    private readonly contentRepo: ItemContentRepository,
    private readonly contentsRepo: ItemContentsRepository,
    private readonly authorRepo: AuthorRepository,
    private readonly licenseRepo: LicenseRepository,
  ) {}

  // --- Item_Content operations ---

  async findById(id: string): Promise<ItemContent> {
    const content = await this.contentRepo.findById(id);
    if (!content) throw new NotFoundError('ItemContent', id);
    return content;
  }

  async findAll(): Promise<ItemContent[]> {
    return this.contentRepo.findAll();
  }

  async create(input: CreateItemContentInput): Promise<ItemContent> {
    const [author, license] = await Promise.all([
      this.authorRepo.findById(input.authorId),
      this.licenseRepo.findById(input.licenseId),
    ]);
    if (!author) throw new ReferentialIntegrityError(`Author '${input.authorId}' not found`);
    if (!license) throw new ReferentialIntegrityError(`License '${input.licenseId}' not found`);
    return this.contentRepo.create(input);
  }

  async update(id: string, input: UpdateItemContentInput): Promise<ItemContent> {
    if (input.authorId) {
      const author = await this.authorRepo.findById(input.authorId);
      if (!author) throw new ReferentialIntegrityError(`Author '${input.authorId}' not found`);
    }
    if (input.licenseId) {
      const license = await this.licenseRepo.findById(input.licenseId);
      if (!license) throw new ReferentialIntegrityError(`License '${input.licenseId}' not found`);
    }
    const content = await this.contentRepo.update(id, input);
    if (!content) throw new NotFoundError('ItemContent', id);
    return content;
  }

  async delete(id: string): Promise<boolean> {
    return this.contentRepo.delete(id);
  }

  // --- Item_Contents (junction) operations ---

  async findAllAssignments(): Promise<ItemContents[]> {
    return this.contentsRepo.findAll();
  }

  async findAssignmentsByItemId(itemId: string): Promise<ItemContents[]> {
    return this.contentsRepo.findByItemId(itemId);
  }

  async createAssignment(input: CreateItemContentsInput): Promise<ItemContents> {
    const content = await this.contentRepo.findById(input.itemMaterialId);
    if (!content)
      throw new ReferentialIntegrityError(`ItemContent '${input.itemMaterialId}' not found`);
    return this.contentsRepo.create(input);
  }

  async updateAssignment(id: string, input: UpdateItemContentsInput): Promise<ItemContents> {
    const assignment = await this.contentsRepo.update(id, input);
    if (!assignment) throw new NotFoundError('ItemContents', id);
    return assignment;
  }

  async deleteAssignment(id: string): Promise<boolean> {
    return this.contentsRepo.delete(id);
  }
}
