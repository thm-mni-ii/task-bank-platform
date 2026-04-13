import { ValidatorRepository, ItemValidatorRepository } from '../../domain/validator/repository';
import {
  Validator,
  CreateValidatorInput,
  UpdateValidatorInput,
  ItemValidator,
} from '../../domain/validator/entity';
import { NotFoundError } from '../../shared/errors';

export class ValidatorService {
  constructor(
    private readonly validatorRepo: ValidatorRepository,
    private readonly itemValidatorRepo: ItemValidatorRepository,
  ) {}

  async findById(id: string): Promise<Validator> {
    const validator = await this.validatorRepo.findById(id);
    if (!validator) throw new NotFoundError('Validator', id);
    return validator;
  }

  async findAll(): Promise<Validator[]> {
    return this.validatorRepo.findAll();
  }

  async create(input: CreateValidatorInput): Promise<Validator> {
    return this.validatorRepo.create(input);
  }

  async update(id: string, input: UpdateValidatorInput): Promise<Validator> {
    const validator = await this.validatorRepo.update(id, input);
    if (!validator) throw new NotFoundError('Validator', id);
    return validator;
  }

  async delete(id: string): Promise<boolean> {
    return this.validatorRepo.delete(id);
  }

  // Item_Validator operations
  async addValidatorToItem(validatorId: string, itemId: string): Promise<ItemValidator> {
    await this.findById(validatorId);
    return this.itemValidatorRepo.create({ validatorId, itemId });
  }

  async removeValidatorFromItem(validatorId: string, itemId: string): Promise<boolean> {
    return this.itemValidatorRepo.delete(validatorId, itemId);
  }

  async getValidatorsByItemId(itemId: string): Promise<ItemValidator[]> {
    return this.itemValidatorRepo.findByItemId(itemId);
  }
}
