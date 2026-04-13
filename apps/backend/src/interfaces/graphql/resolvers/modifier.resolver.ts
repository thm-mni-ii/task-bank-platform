import { ModifierService } from '../../../application/modifier/modifier.service';
import { CreateModifierInput, UpdateModifierInput } from '../../../domain/modifier/entity';

export const createModifierResolvers = (service: ModifierService) => ({
  Query: {
    modifiers: () => service.findAll(),
    modifier: (_: unknown, { id }: { id: string }) => service.findById(id),
    itemModifiers: (_: unknown, { itemId }: { itemId: string }) =>
      service.getModifiersByItemId(itemId),
  },
  Mutation: {
    createModifier: (_: unknown, { input }: { input: CreateModifierInput }) =>
      service.create(input),
    updateModifier: (_: unknown, { id, input }: { id: string; input: UpdateModifierInput }) =>
      service.update(id, input),
    deleteModifier: (_: unknown, { id }: { id: string }) => service.delete(id),
    addModifierToItem: (
      _: unknown,
      { itemId, modifierId }: { itemId: string; modifierId: string },
    ) => service.addModifierToItem(itemId, modifierId),
    removeModifierFromItem: (
      _: unknown,
      { itemId, modifierId }: { itemId: string; modifierId: string },
    ) => service.removeModifierFromItem(itemId, modifierId),
  },
});
