import { ItemModifierRepository } from '../../../../domain/modifier/repository';
import { ItemModifier } from '../../../../domain/modifier/entity';
import { ItemModifierModel } from '../models/item-modifier.model';
import { ItemModifierMapper } from '../mappers/modifier.mapper';

export class MongoItemModifierRepository implements ItemModifierRepository {
  async findByItemId(itemId: string): Promise<ItemModifier[]> {
    const docs = await ItemModifierModel.find({ itemId });
    return docs.map(ItemModifierMapper.toDomain);
  }

  async findByModifierId(modifierId: string): Promise<ItemModifier[]> {
    const docs = await ItemModifierModel.find({ modifierId });
    return docs.map(ItemModifierMapper.toDomain);
  }

  async create(input: ItemModifier): Promise<ItemModifier> {
    const doc = await ItemModifierModel.create(input);
    return ItemModifierMapper.toDomain(doc);
  }

  async delete(itemId: string, modifierId: string): Promise<boolean> {
    const result = await ItemModifierModel.findOneAndDelete({ itemId, modifierId });
    return result !== null;
  }

  async deleteAllByItemId(itemId: string): Promise<number> {
    const result = await ItemModifierModel.deleteMany({ itemId });
    return result.deletedCount;
  }
}
