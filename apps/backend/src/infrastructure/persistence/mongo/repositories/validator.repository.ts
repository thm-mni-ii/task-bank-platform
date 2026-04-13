import { ValidatorRepository } from '../../../../domain/validator/repository';
import {
  Validator,
  CreateValidatorInput,
  UpdateValidatorInput,
} from '../../../../domain/validator/entity';
import { ValidatorModel } from '../models/validator.model';
import { ValidatorMapper } from '../mappers/validator.mapper';

export class MongoValidatorRepository implements ValidatorRepository {
  async findById(id: string): Promise<Validator | null> {
    const doc = await ValidatorModel.findById(id);
    return doc ? ValidatorMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Validator[]> {
    const docs = await ValidatorModel.find();
    return docs.map(ValidatorMapper.toDomain);
  }

  async create(input: CreateValidatorInput): Promise<Validator> {
    const doc = await ValidatorModel.create(input);
    return ValidatorMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateValidatorInput): Promise<Validator | null> {
    const doc = await ValidatorModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? ValidatorMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ValidatorModel.findByIdAndDelete(id);
    return result !== null;
  }
}
