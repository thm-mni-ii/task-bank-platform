import { ItemCollectionService } from '../../../application/item-collection/item-collection.service';
import {
  CreateItemCollectionInput,
  UpdateItemCollectionInput,
  CreateItemCollectionSubItemInput,
  UpdateItemCollectionSubItemInput,
} from '../../../domain/item-collection/entity';

export const createItemCollectionResolvers = (service: ItemCollectionService) => ({
  Query: {
    itemCollections: () => service.findAll(),
    itemCollection: (_: unknown, { id }: { id: string }) => service.findById(id),
    itemCollectionSubItems: (_: unknown, { collectionId }: { collectionId: string }) =>
      service.getSubItems(collectionId),
  },
  Mutation: {
    createItemCollection: (_: unknown, { input }: { input: CreateItemCollectionInput }) =>
      service.create(input),
    updateItemCollection: (
      _: unknown,
      { id, input }: { id: string; input: UpdateItemCollectionInput },
    ) => service.update(id, input),
    deleteItemCollection: (_: unknown, { id }: { id: string }) => service.delete(id),
    addSubItemToCollection: (_: unknown, { input }: { input: CreateItemCollectionSubItemInput }) =>
      service.addSubItem(input),
    updateSubItemPosition: (
      _: unknown,
      {
        collectionId,
        subitemId,
        input,
      }: {
        collectionId: string;
        subitemId: string;
        input: UpdateItemCollectionSubItemInput;
      },
    ) => service.updateSubItem(collectionId, subitemId, input),
    removeSubItemFromCollection: (
      _: unknown,
      { collectionId, subitemId }: { collectionId: string; subitemId: string },
    ) => service.removeSubItem(collectionId, subitemId),
  },
});
