import {
  TagRepository,
  ItemTagRepository,
  ItemContentTagRepository,
} from '../../domain/tag/repository';
import {
  Tag,
  CreateTagInput,
  UpdateTagInput,
  ItemTag,
  ItemContentTag,
} from '../../domain/tag/entity';
import { NotFoundError, ReferentialIntegrityError } from '../../shared/errors';

export class TagService {
  constructor(
    private readonly tagRepo: TagRepository,
    private readonly itemTagRepo: ItemTagRepository,
    private readonly itemContentTagRepo: ItemContentTagRepository,
  ) {}

  async findById(id: string): Promise<Tag> {
    const tag = await this.tagRepo.findById(id);
    if (!tag) throw new NotFoundError('Tag', id);
    return tag;
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepo.findAll();
  }

  async findChildren(parentTagId: string): Promise<Tag[]> {
    return this.tagRepo.findByParentId(parentTagId);
  }

  async findRootTags(): Promise<Tag[]> {
    return this.tagRepo.findByParentId(null);
  }

  async create(input: CreateTagInput): Promise<Tag> {
    if (input.parentTagId) {
      const parent = await this.tagRepo.findById(input.parentTagId);
      if (!parent)
        throw new ReferentialIntegrityError(`Parent tag '${input.parentTagId}' not found`);
    }
    return this.tagRepo.create(input);
  }

  async update(id: string, input: UpdateTagInput): Promise<Tag> {
    if (input.parentTagId) {
      const parent = await this.tagRepo.findById(input.parentTagId);
      if (!parent)
        throw new ReferentialIntegrityError(`Parent tag '${input.parentTagId}' not found`);
    }
    const tag = await this.tagRepo.update(id, input);
    if (!tag) throw new NotFoundError('Tag', id);
    return tag;
  }

  async delete(id: string): Promise<boolean> {
    return this.tagRepo.delete(id);
  }

  // Item_Tags operations
  async addTagToItem(itemId: string, tagId: string): Promise<ItemTag> {
    await this.findById(tagId); // validate tag exists
    return this.itemTagRepo.create({ itemId, tagId });
  }

  async removeTagFromItem(itemId: string, tagId: string): Promise<boolean> {
    return this.itemTagRepo.delete(itemId, tagId);
  }

  async getTagsByItemId(itemId: string): Promise<ItemTag[]> {
    return this.itemTagRepo.findByItemId(itemId);
  }

  // Item_Content_Tags operations
  async addContentTag(itemId: string, tagId: string): Promise<ItemContentTag> {
    await this.findById(tagId);
    return this.itemContentTagRepo.create({ itemId, tagId });
  }

  async removeContentTag(itemId: string, tagId: string): Promise<boolean> {
    return this.itemContentTagRepo.delete(itemId, tagId);
  }

  async getContentTagsByItemId(itemId: string): Promise<ItemContentTag[]> {
    return this.itemContentTagRepo.findByItemId(itemId);
  }
}
