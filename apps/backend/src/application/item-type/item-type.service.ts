import { ItemTypeRepository } from '../../domain/item-type/repository';
import { ItemType, CreateItemTypeInput, UpdateItemTypeInput } from '../../domain/item-type/entity';
import { NotFoundError } from '../../shared/errors';

export class ItemTypeService {
  constructor(private readonly itemTypeRepo: ItemTypeRepository) {}

  async findById(id: string): Promise<ItemType> {
    const itemType = await this.itemTypeRepo.findById(id);
    if (!itemType) throw new NotFoundError('ItemType', id);
    return itemType;
  }

  async findAll(): Promise<ItemType[]> {
    return this.itemTypeRepo.findAll();
  }

  async create(input: CreateItemTypeInput): Promise<ItemType> {
    return this.itemTypeRepo.create(input);
  }

  async update(id: string, input: UpdateItemTypeInput): Promise<ItemType> {
    const itemType = await this.itemTypeRepo.update(id, input);
    if (!itemType) throw new NotFoundError('ItemType', id);
    return itemType;
  }

  async delete(id: string): Promise<boolean> {
    return this.itemTypeRepo.delete(id);
  }
}
