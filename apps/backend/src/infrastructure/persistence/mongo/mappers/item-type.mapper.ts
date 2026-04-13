import { ItemType } from '../../../../domain/item-type/entity';
import { ItemTypeDocument } from '../models/item-type.model';

export class ItemTypeMapper {
  static toDomain(doc: ItemTypeDocument): ItemType {
    return {
      id: doc._id.toString(),
      itemTypeName: doc.itemTypeName,
      description: doc.description,
    };
  }
}
