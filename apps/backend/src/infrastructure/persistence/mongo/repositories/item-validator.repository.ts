import { ItemValidatorRepository } from '../../../../domain/validator/repository';
import { ItemValidator } from '../../../../domain/validator/entity';
import { ItemValidatorModel } from '../models/item-validator.model';
import { ItemValidatorMapper } from '../mappers/validator.mapper';

export class MongoItemValidatorRepository implements ItemValidatorRepository {
  async findByItemId(itemId: string): Promise<ItemValidator[]> {
    const docs = await ItemValidatorModel.find({ itemId });
    return docs.map(ItemValidatorMapper.toDomain);
  }

  async findByValidatorId(validatorId: string): Promise<ItemValidator[]> {
    const docs = await ItemValidatorModel.find({ validatorId });
    return docs.map(ItemValidatorMapper.toDomain);
  }

  async create(input: ItemValidator): Promise<ItemValidator> {
    const doc = await ItemValidatorModel.create(input);
    return ItemValidatorMapper.toDomain(doc);
  }

  async delete(validatorId: string, itemId: string): Promise<boolean> {
    const result = await ItemValidatorModel.findOneAndDelete({ validatorId, itemId });
    return result !== null;
  }

  async deleteAllByItemId(itemId: string): Promise<number> {
    const result = await ItemValidatorModel.deleteMany({ itemId });
    return result.deletedCount;
  }
}
