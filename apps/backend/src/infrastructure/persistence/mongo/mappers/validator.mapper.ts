import { Validator, ItemValidator } from '../../../../domain/validator/entity';
import { ValidatorDocument } from '../models/validator.model';
import { ItemValidatorDocument } from '../models/item-validator.model';

export class ValidatorMapper {
  static toDomain(doc: ValidatorDocument): Validator {
    return {
      id: doc._id.toString(),
      description: doc.description,
      validator: doc.validator,
    };
  }
}

export class ItemValidatorMapper {
  static toDomain(doc: ItemValidatorDocument): ItemValidator {
    return {
      itemId: doc.itemId.toString(),
      validatorId: doc.validatorId.toString(),
    };
  }
}
