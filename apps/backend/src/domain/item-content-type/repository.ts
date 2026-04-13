import { CrudRepository } from '../common/types';
import {
  ItemContentType,
  CreateItemContentTypeInput,
  UpdateItemContentTypeInput,
  ItemContentTypeAssignment,
  CreateItemContentTypeAssignmentInput,
} from './entity';

export type ItemContentTypeRepository = CrudRepository<
  ItemContentType,
  CreateItemContentTypeInput,
  UpdateItemContentTypeInput
>;

export interface ItemContentTypeAssignmentRepository {
  findAll(): Promise<ItemContentTypeAssignment[]>;
  findByItemTypeId(itemTypeId: string): Promise<ItemContentTypeAssignment[]>;
  findByContentTypeId(itemContentTypeId: string): Promise<ItemContentTypeAssignment[]>;
  create(input: CreateItemContentTypeAssignmentInput): Promise<ItemContentTypeAssignment>;
  delete(id: string): Promise<boolean>;
}
