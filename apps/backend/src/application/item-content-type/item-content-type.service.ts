import {
  ItemContentTypeRepository,
  ItemContentTypeAssignmentRepository,
} from '../../domain/item-content-type/repository';
import {
  ItemContentType,
  CreateItemContentTypeInput,
  UpdateItemContentTypeInput,
  ItemContentTypeAssignment,
  CreateItemContentTypeAssignmentInput,
} from '../../domain/item-content-type/entity';
import { NotFoundError, ReferentialIntegrityError } from '../../shared/errors';

export class ItemContentTypeService {
  constructor(
    private readonly contentTypeRepo: ItemContentTypeRepository,
    private readonly assignmentRepo: ItemContentTypeAssignmentRepository,
  ) {}

  async findById(id: string): Promise<ItemContentType> {
    const ct = await this.contentTypeRepo.findById(id);
    if (!ct) throw new NotFoundError('ItemContentType', id);
    return ct;
  }

  async findAll(): Promise<ItemContentType[]> {
    return this.contentTypeRepo.findAll();
  }

  async create(input: CreateItemContentTypeInput): Promise<ItemContentType> {
    return this.contentTypeRepo.create(input);
  }

  async update(id: string, input: UpdateItemContentTypeInput): Promise<ItemContentType> {
    const ct = await this.contentTypeRepo.update(id, input);
    if (!ct) throw new NotFoundError('ItemContentType', id);
    return ct;
  }

  async delete(id: string): Promise<boolean> {
    return this.contentTypeRepo.delete(id);
  }

  // Item_Content_Types (junction) operations
  async getAssignments(): Promise<ItemContentTypeAssignment[]> {
    return this.assignmentRepo.findAll();
  }

  async getAssignmentsByItemTypeId(itemTypeId: string): Promise<ItemContentTypeAssignment[]> {
    return this.assignmentRepo.findByItemTypeId(itemTypeId);
  }

  async createAssignment(
    input: CreateItemContentTypeAssignmentInput,
  ): Promise<ItemContentTypeAssignment> {
    const ct = await this.contentTypeRepo.findById(input.itemContentTypeId);
    if (!ct)
      throw new ReferentialIntegrityError(`ItemContentType '${input.itemContentTypeId}' not found`);
    return this.assignmentRepo.create(input);
  }

  async deleteAssignment(id: string): Promise<boolean> {
    return this.assignmentRepo.delete(id);
  }
}
