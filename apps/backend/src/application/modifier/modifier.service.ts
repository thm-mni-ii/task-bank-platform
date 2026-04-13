import { ModifierRepository, ItemModifierRepository } from '../../domain/modifier/repository';
import {
  Modifier,
  CreateModifierInput,
  UpdateModifierInput,
  ItemModifier,
} from '../../domain/modifier/entity';
import { NotFoundError } from '../../shared/errors';

export class ModifierService {
  constructor(
    private readonly modifierRepo: ModifierRepository,
    private readonly itemModifierRepo: ItemModifierRepository,
  ) {}

  async findById(id: string): Promise<Modifier> {
    const modifier = await this.modifierRepo.findById(id);
    if (!modifier) throw new NotFoundError('Modifier', id);
    return modifier;
  }

  async findAll(): Promise<Modifier[]> {
    return this.modifierRepo.findAll();
  }

  async create(input: CreateModifierInput): Promise<Modifier> {
    return this.modifierRepo.create(input);
  }

  async update(id: string, input: UpdateModifierInput): Promise<Modifier> {
    const modifier = await this.modifierRepo.update(id, input);
    if (!modifier) throw new NotFoundError('Modifier', id);
    return modifier;
  }

  async delete(id: string): Promise<boolean> {
    return this.modifierRepo.delete(id);
  }

  // Item_Modifier operations
  async addModifierToItem(itemId: string, modifierId: string): Promise<ItemModifier> {
    await this.findById(modifierId);
    return this.itemModifierRepo.create({ itemId, modifierId });
  }

  async removeModifierFromItem(itemId: string, modifierId: string): Promise<boolean> {
    return this.itemModifierRepo.delete(itemId, modifierId);
  }

  async getModifiersByItemId(itemId: string): Promise<ItemModifier[]> {
    return this.itemModifierRepo.findByItemId(itemId);
  }
}
