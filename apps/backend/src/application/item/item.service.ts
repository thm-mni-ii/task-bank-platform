import { ItemRepository, ItemRepresentationTemplateRepository } from '../../domain/item/repository';
import {
  Item,
  CreateItemInput,
  UpdateItemInput,
  ItemRepresentationTemplate,
  CreateItemRepresentationTemplateInput,
  UpdateItemRepresentationTemplateInput,
} from '../../domain/item/entity';
import { AuthorRepository } from '../../domain/author/repository';
import { LicenseRepository } from '../../domain/license/repository';
import { ItemTypeRepository } from '../../domain/item-type/repository';
import { NotFoundError, ReferentialIntegrityError } from '../../shared/errors';

export class ItemService {
  constructor(
    private readonly itemRepo: ItemRepository,
    private readonly templateRepo: ItemRepresentationTemplateRepository,
    private readonly authorRepo: AuthorRepository,
    private readonly licenseRepo: LicenseRepository,
    private readonly itemTypeRepo: ItemTypeRepository,
  ) {}

  // --- Item operations ---

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepo.findById(id);
    if (!item) throw new NotFoundError('Item', id);
    return item;
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepo.findAll();
  }

  async findVariants(rootItemId: string): Promise<Item[]> {
    return this.itemRepo.findByRootItemId(rootItemId);
  }

  async create(input: CreateItemInput): Promise<Item> {
    await this.validateItemReferences(input);
    return this.itemRepo.create(input);
  }

  async update(id: string, input: UpdateItemInput): Promise<Item> {
    if (input.authorId || input.licenseId || input.itemTypeId || input.itemTemplateId) {
      const current = await this.findById(id);
      await this.validateItemReferences({
        authorId: input.authorId ?? current.authorId,
        licenseId: input.licenseId ?? current.licenseId,
        itemTypeId: input.itemTypeId ?? current.itemTypeId,
        itemTemplateId: input.itemTemplateId ?? current.itemTemplateId,
      });
    }
    if (input.rootItemId) {
      const rootItem = await this.itemRepo.findById(input.rootItemId);
      if (!rootItem)
        throw new ReferentialIntegrityError(`Root item '${input.rootItemId}' not found`);
    }
    const item = await this.itemRepo.update(id, input);
    if (!item) throw new NotFoundError('Item', id);
    return item;
  }

  async delete(id: string): Promise<boolean> {
    return this.itemRepo.delete(id);
  }

  // --- Template operations ---

  async findTemplateById(id: string): Promise<ItemRepresentationTemplate> {
    const template = await this.templateRepo.findById(id);
    if (!template) throw new NotFoundError('ItemRepresentationTemplate', id);
    return template;
  }

  async findAllTemplates(): Promise<ItemRepresentationTemplate[]> {
    return this.templateRepo.findAll();
  }

  async createTemplate(
    input: CreateItemRepresentationTemplateInput,
  ): Promise<ItemRepresentationTemplate> {
    return this.templateRepo.create(input);
  }

  async updateTemplate(
    id: string,
    input: UpdateItemRepresentationTemplateInput,
  ): Promise<ItemRepresentationTemplate> {
    const template = await this.templateRepo.update(id, input);
    if (!template) throw new NotFoundError('ItemRepresentationTemplate', id);
    return template;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return this.templateRepo.delete(id);
  }

  // --- Private helpers ---

  private async validateItemReferences(
    input: Pick<CreateItemInput, 'authorId' | 'licenseId' | 'itemTypeId' | 'itemTemplateId'>,
  ): Promise<void> {
    const [author, license, itemType, template] = await Promise.all([
      this.authorRepo.findById(input.authorId),
      this.licenseRepo.findById(input.licenseId),
      this.itemTypeRepo.findById(input.itemTypeId),
      this.templateRepo.findById(input.itemTemplateId),
    ]);

    if (!author) throw new ReferentialIntegrityError(`Author '${input.authorId}' not found`);
    if (!license) throw new ReferentialIntegrityError(`License '${input.licenseId}' not found`);
    if (!itemType) throw new ReferentialIntegrityError(`ItemType '${input.itemTypeId}' not found`);
    if (!template)
      throw new ReferentialIntegrityError(
        `ItemRepresentationTemplate '${input.itemTemplateId}' not found`,
      );
  }
}
