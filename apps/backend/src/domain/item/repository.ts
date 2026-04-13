import { CrudRepository } from '../common/types';
import {
  Item,
  CreateItemInput,
  UpdateItemInput,
  ItemRepresentationTemplate,
  CreateItemRepresentationTemplateInput,
  UpdateItemRepresentationTemplateInput,
} from './entity';

export type ItemRepository = CrudRepository<Item, CreateItemInput, UpdateItemInput> & {
  findByRootItemId(rootItemId: string): Promise<Item[]>;
};

export type ItemRepresentationTemplateRepository = CrudRepository<
  ItemRepresentationTemplate,
  CreateItemRepresentationTemplateInput,
  UpdateItemRepresentationTemplateInput
>;
