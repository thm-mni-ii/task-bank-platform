import { TagService } from '../../../application/tag/tag.service';
import { CreateTagInput, UpdateTagInput } from '../../../domain/tag/entity';

export const createTagResolvers = (service: TagService) => ({
  Query: {
    tags: () => service.findAll(),
    tag: (_: unknown, { id }: { id: string }) => service.findById(id),
    rootTags: () => service.findRootTags(),
    childTags: (_: unknown, { parentTagId }: { parentTagId: string }) =>
      service.findChildren(parentTagId),
    itemTags: (_: unknown, { itemId }: { itemId: string }) => service.getTagsByItemId(itemId),
    itemContentTags: (_: unknown, { itemId }: { itemId: string }) =>
      service.getContentTagsByItemId(itemId),
  },
  Mutation: {
    createTag: (_: unknown, { input }: { input: CreateTagInput }) => service.create(input),
    updateTag: (_: unknown, { id, input }: { id: string; input: UpdateTagInput }) =>
      service.update(id, input),
    deleteTag: (_: unknown, { id }: { id: string }) => service.delete(id),
    addTagToItem: (_: unknown, { itemId, tagId }: { itemId: string; tagId: string }) =>
      service.addTagToItem(itemId, tagId),
    removeTagFromItem: (_: unknown, { itemId, tagId }: { itemId: string; tagId: string }) =>
      service.removeTagFromItem(itemId, tagId),
    addContentTag: (_: unknown, { itemId, tagId }: { itemId: string; tagId: string }) =>
      service.addContentTag(itemId, tagId),
    removeContentTag: (_: unknown, { itemId, tagId }: { itemId: string; tagId: string }) =>
      service.removeContentTag(itemId, tagId),
  },
});
