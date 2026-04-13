import { CrudRepository } from '../common/types';
import { Author, CreateAuthorInput, UpdateAuthorInput } from './entity';

export type AuthorRepository = CrudRepository<Author, CreateAuthorInput, UpdateAuthorInput>;
