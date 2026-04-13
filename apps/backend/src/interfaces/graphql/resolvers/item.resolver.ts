import { ItemService } from '../../../application/item/item.service';
import { CreateItemInput, UpdateItemInput } from '../../../domain/item/entity';

export const createItemResolvers = (service: ItemService) => ({
  Query: {
    items: () => service.findAll(),
    item: (_: unknown, { id }: { id: string }) => service.findById(id),
    itemVariants: (_: unknown, { rootItemId }: { rootItemId: string }) =>
      service.findVariants(rootItemId),
    itemRepresentationTemplates: () => service.findAllTemplates(),
    itemRepresentationTemplate: (_: unknown, { id }: { id: string }) =>
      service.findTemplateById(id),
  },
  Mutation: {
    createItem: (_: unknown, { input }: { input: CreateItemInput }) => service.create(input),
    updateItem: (_: unknown, { id, input }: { id: string; input: UpdateItemInput }) =>
      service.update(id, input),
    deleteItem: (_: unknown, { id }: { id: string }) => service.delete(id),
    createItemRepresentationTemplate: (
      _: unknown,
      { input }: { input: { template: Record<string, unknown> } },
    ) => service.createTemplate(input),
    updateItemRepresentationTemplate: (
      _: unknown,
      { id, input }: { id: string; input: { template?: Record<string, unknown> } },
    ) => service.updateTemplate(id, input),
    deleteItemRepresentationTemplate: (_: unknown, { id }: { id: string }) =>
      service.deleteTemplate(id),
  },
});
