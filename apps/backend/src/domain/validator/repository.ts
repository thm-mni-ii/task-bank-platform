import { CrudRepository } from '../common/types';
import { Validator, CreateValidatorInput, UpdateValidatorInput, ItemValidator } from './entity';

export type ValidatorRepository = CrudRepository<
  Validator,
  CreateValidatorInput,
  UpdateValidatorInput
>;

export interface ItemValidatorRepository {
  findByItemId(itemId: string): Promise<ItemValidator[]>;
  findByValidatorId(validatorId: string): Promise<ItemValidator[]>;
  create(input: ItemValidator): Promise<ItemValidator>;
  delete(validatorId: string, itemId: string): Promise<boolean>;
  deleteAllByItemId(itemId: string): Promise<number>;
}
