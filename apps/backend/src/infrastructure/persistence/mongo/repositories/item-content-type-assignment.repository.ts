import { ItemContentTypeAssignmentRepository } from '../../../../domain/item-content-type/repository';
import {
  ItemContentTypeAssignment,
  CreateItemContentTypeAssignmentInput,
} from '../../../../domain/item-content-type/entity';
import { ItemContentTypeAssignmentModel } from '../models/item-content-type-assignment.model';
import { ItemContentTypeAssignmentMapper } from '../mappers/item-content-type.mapper';

export class MongoItemContentTypeAssignmentRepository implements ItemContentTypeAssignmentRepository {
  async findAll(): Promise<ItemContentTypeAssignment[]> {
    const docs = await ItemContentTypeAssignmentModel.find();
    return docs.map(ItemContentTypeAssignmentMapper.toDomain);
  }

  async findByItemTypeId(itemTypeId: string): Promise<ItemContentTypeAssignment[]> {
    const docs = await ItemContentTypeAssignmentModel.find({ itemTypeId });
    return docs.map(ItemContentTypeAssignmentMapper.toDomain);
  }

  async findByContentTypeId(itemContentTypeId: string): Promise<ItemContentTypeAssignment[]> {
    const docs = await ItemContentTypeAssignmentModel.find({ itemContentTypeId });
    return docs.map(ItemContentTypeAssignmentMapper.toDomain);
  }

  async create(input: CreateItemContentTypeAssignmentInput): Promise<ItemContentTypeAssignment> {
    const doc = await ItemContentTypeAssignmentModel.create(input);
    return ItemContentTypeAssignmentMapper.toDomain(doc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemContentTypeAssignmentModel.findByIdAndDelete(id);
    return result !== null;
  }
}
