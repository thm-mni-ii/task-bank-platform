import { AuthorService } from '../../../application/author/author.service';

export const createAuthorResolvers = (service: AuthorService) => ({
  Query: {
    authors: () => service.findAll(),
    author: (_: unknown, { id }: { id: string }) => service.findById(id),
  },
  Mutation: {
    createAuthor: (_: unknown, { input }: { input: { descriptor: string; mail: string } }) =>
      service.create(input),
    updateAuthor: (
      _: unknown,
      { id, input }: { id: string; input: { descriptor?: string; mail?: string } },
    ) => service.update(id, input),
    deleteAuthor: (_: unknown, { id }: { id: string }) => service.delete(id),
  },
});
