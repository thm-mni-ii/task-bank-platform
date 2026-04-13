import { ItemTypeService } from '../../../application/item-type/item-type.service';
import { CreateItemTypeInput, UpdateItemTypeInput } from '../../../domain/item-type/entity';

export const createItemTypeResolvers = (service: ItemTypeService) => ({
  Query: {
    itemTypes: () => service.findAll(),
    itemType: (_: unknown, { id }: { id: string }) => service.findById(id),
  },
  Mutation: {
    createItemType: (_: unknown, { input }: { input: CreateItemTypeInput }) =>
      service.create(input),
    updateItemType: (_: unknown, { id, input }: { id: string; input: UpdateItemTypeInput }) =>
      service.update(id, input),
    deleteItemType: (_: unknown, { id }: { id: string }) => service.delete(id),
  },
});
