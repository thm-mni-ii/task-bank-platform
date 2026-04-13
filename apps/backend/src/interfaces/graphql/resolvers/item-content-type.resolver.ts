import { ItemContentTypeService } from '../../../application/item-content-type/item-content-type.service';
import {
  CreateItemContentTypeInput,
  UpdateItemContentTypeInput,
  CreateItemContentTypeAssignmentInput,
} from '../../../domain/item-content-type/entity';

export const createItemContentTypeResolvers = (service: ItemContentTypeService) => ({
  Query: {
    itemContentTypes: () => service.findAll(),
    itemContentType: (_: unknown, { id }: { id: string }) => service.findById(id),
    itemContentTypeAssignments: () => service.getAssignments(),
    itemContentTypeAssignmentsByItemType: (_: unknown, { itemTypeId }: { itemTypeId: string }) =>
      service.getAssignmentsByItemTypeId(itemTypeId),
  },
  Mutation: {
    createItemContentType: (_: unknown, { input }: { input: CreateItemContentTypeInput }) =>
      service.create(input),
    updateItemContentType: (
      _: unknown,
      { id, input }: { id: string; input: UpdateItemContentTypeInput },
    ) => service.update(id, input),
    deleteItemContentType: (_: unknown, { id }: { id: string }) => service.delete(id),
    createItemContentTypeAssignment: (
      _: unknown,
      { input }: { input: CreateItemContentTypeAssignmentInput },
    ) => service.createAssignment(input),
    deleteItemContentTypeAssignment: (_: unknown, { id }: { id: string }) =>
      service.deleteAssignment(id),
  },
});
