import {
  ItemContentType,
  ItemContentTypeAssignment,
} from '../../../../domain/item-content-type/entity';
import { ItemContentTypeDocument } from '../models/item-content-type.model';
import { ItemContentTypeAssignmentDocument } from '../models/item-content-type-assignment.model';

export class ItemContentTypeMapper {
  static toDomain(doc: ItemContentTypeDocument): ItemContentType {
    return {
      id: doc._id.toString(),
      itemContentTypeName: doc.itemContentTypeName,
      description: doc.description,
    };
  }
}

export class ItemContentTypeAssignmentMapper {
  static toDomain(doc: ItemContentTypeAssignmentDocument): ItemContentTypeAssignment {
    return {
      id: doc._id.toString(),
      itemTypeId: doc.itemTypeId.toString(),
      itemContentTypeId: doc.itemContentTypeId.toString(),
    };
  }
}
