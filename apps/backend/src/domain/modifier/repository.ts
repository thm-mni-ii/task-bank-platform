import { CrudRepository } from '../common/types';
import { Modifier, CreateModifierInput, UpdateModifierInput, ItemModifier } from './entity';

export type ModifierRepository = CrudRepository<Modifier, CreateModifierInput, UpdateModifierInput>;

export interface ItemModifierRepository {
  findByItemId(itemId: string): Promise<ItemModifier[]>;
  findByModifierId(modifierId: string): Promise<ItemModifier[]>;
  create(input: ItemModifier): Promise<ItemModifier>;
  delete(itemId: string, modifierId: string): Promise<boolean>;
  deleteAllByItemId(itemId: string): Promise<number>;
}
