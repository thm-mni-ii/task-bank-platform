import { CrudRepository } from '../common/types';
import { ItemType, CreateItemTypeInput, UpdateItemTypeInput } from './entity';

export type ItemTypeRepository = CrudRepository<ItemType, CreateItemTypeInput, UpdateItemTypeInput>;
