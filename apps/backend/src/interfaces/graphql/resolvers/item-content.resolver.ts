import { ItemContentService } from '../../../application/item-content/item-content.service';
import {
  CreateItemContentInput,
  UpdateItemContentInput,
  CreateItemContentsInput,
  UpdateItemContentsInput,
} from '../../../domain/item-content/entity';

export const createItemContentResolvers = (service: ItemContentService) => ({
  Query: {
    itemContents: () => service.findAll(),
    itemContent: (_: unknown, { id }: { id: string }) => service.findById(id),
    itemContentsAssignments: () => service.findAllAssignments(),
    itemContentsAssignmentsByItem: (_: unknown, { itemId }: { itemId: string }) =>
      service.findAssignmentsByItemId(itemId),
  },
  Mutation: {
    createItemContent: (_: unknown, { input }: { input: CreateItemContentInput }) =>
      service.create(input),
    updateItemContent: (_: unknown, { id, input }: { id: string; input: UpdateItemContentInput }) =>
      service.update(id, input),
    deleteItemContent: (_: unknown, { id }: { id: string }) => service.delete(id),
    createItemContentsAssignment: (_: unknown, { input }: { input: CreateItemContentsInput }) =>
      service.createAssignment(input),
    updateItemContentsAssignment: (
      _: unknown,
      { id, input }: { id: string; input: UpdateItemContentsInput },
    ) => service.updateAssignment(id, input),
    deleteItemContentsAssignment: (_: unknown, { id }: { id: string }) =>
      service.deleteAssignment(id),
  },
});
