import { ValidatorService } from '../../../application/validator/validator.service';
import { CreateValidatorInput, UpdateValidatorInput } from '../../../domain/validator/entity';

export const createValidatorResolvers = (service: ValidatorService) => ({
  Query: {
    validators: () => service.findAll(),
    validator: (_: unknown, { id }: { id: string }) => service.findById(id),
    itemValidators: (_: unknown, { itemId }: { itemId: string }) =>
      service.getValidatorsByItemId(itemId),
  },
  Mutation: {
    createValidator: (_: unknown, { input }: { input: CreateValidatorInput }) =>
      service.create(input),
    updateValidator: (_: unknown, { id, input }: { id: string; input: UpdateValidatorInput }) =>
      service.update(id, input),
    deleteValidator: (_: unknown, { id }: { id: string }) => service.delete(id),
    addValidatorToItem: (
      _: unknown,
      { validatorId, itemId }: { validatorId: string; itemId: string },
    ) => service.addValidatorToItem(validatorId, itemId),
    removeValidatorFromItem: (
      _: unknown,
      { validatorId, itemId }: { validatorId: string; itemId: string },
    ) => service.removeValidatorFromItem(validatorId, itemId),
  },
});
