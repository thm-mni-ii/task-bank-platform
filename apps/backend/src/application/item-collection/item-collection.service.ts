import {
  ItemCollectionRepository,
  ItemCollectionSubItemRepository,
} from '../../domain/item-collection/repository';
import {
  ItemCollection,
  CreateItemCollectionInput,
  UpdateItemCollectionInput,
  ItemCollectionSubItem,
  CreateItemCollectionSubItemInput,
  UpdateItemCollectionSubItemInput,
} from '../../domain/item-collection/entity';
import { ItemRepository } from '../../domain/item/repository';
import { NotFoundError, ReferentialIntegrityError } from '../../shared/errors';

export class ItemCollectionService {
  constructor(
    private readonly collectionRepo: ItemCollectionRepository,
    private readonly subItemRepo: ItemCollectionSubItemRepository,
    private readonly itemRepo: ItemRepository,
  ) {}

  // --- Item_Collection operations ---

  async findById(id: string): Promise<ItemCollection> {
    const collection = await this.collectionRepo.findById(id);
    if (!collection) throw new NotFoundError('ItemCollection', id);
    return collection;
  }

  async findAll(): Promise<ItemCollection[]> {
    return this.collectionRepo.findAll();
  }

  async create(input: CreateItemCollectionInput): Promise<ItemCollection> {
    const parentItem = await this.itemRepo.findById(input.parentItemId);
    if (!parentItem)
      throw new ReferentialIntegrityError(`Parent item '${input.parentItemId}' not found`);
    return this.collectionRepo.create(input);
  }

  async update(id: string, input: UpdateItemCollectionInput): Promise<ItemCollection> {
    if (input.parentItemId) {
      const parentItem = await this.itemRepo.findById(input.parentItemId);
      if (!parentItem)
        throw new ReferentialIntegrityError(`Parent item '${input.parentItemId}' not found`);
    }
    const collection = await this.collectionRepo.update(id, input);
    if (!collection) throw new NotFoundError('ItemCollection', id);
    return collection;
  }

  async delete(id: string): Promise<boolean> {
    await this.subItemRepo.deleteAllByCollectionId(id);
    return this.collectionRepo.delete(id);
  }

  // --- Item_Collection_Sub_Item operations ---

  async getSubItems(collectionId: string): Promise<ItemCollectionSubItem[]> {
    return this.subItemRepo.findByCollectionId(collectionId);
  }

  async addSubItem(input: CreateItemCollectionSubItemInput): Promise<ItemCollectionSubItem> {
    const [collection, item] = await Promise.all([
      this.collectionRepo.findById(input.itemCollectionId),
      this.itemRepo.findById(input.subitemId),
    ]);
    if (!collection)
      throw new ReferentialIntegrityError(`ItemCollection '${input.itemCollectionId}' not found`);
    if (!item) throw new ReferentialIntegrityError(`Item '${input.subitemId}' not found`);
    return this.subItemRepo.create(input);
  }

  async updateSubItem(
    collectionId: string,
    subitemId: string,
    input: UpdateItemCollectionSubItemInput,
  ): Promise<ItemCollectionSubItem> {
    const subItem = await this.subItemRepo.update(collectionId, subitemId, input);
    if (!subItem) throw new NotFoundError('ItemCollectionSubItem', `${collectionId}/${subitemId}`);
    return subItem;
  }

  async removeSubItem(collectionId: string, subitemId: string): Promise<boolean> {
    return this.subItemRepo.delete(collectionId, subitemId);
  }
}
