import { ItemCollection, ItemCollectionSubItem } from '../../../../domain/item-collection/entity';
import { ItemCollectionDocument } from '../models/item-collection.model';
import { ItemCollectionSubItemDocument } from '../models/item-collection-sub-item.model';

export class ItemCollectionMapper {
  static toDomain(doc: ItemCollectionDocument): ItemCollection {
    return {
      id: doc._id.toString(),
      parentItemId: doc.parentItemId.toString(),
      order: doc.order,
    };
  }
}

export class ItemCollectionSubItemMapper {
  static toDomain(doc: ItemCollectionSubItemDocument): ItemCollectionSubItem {
    return {
      itemCollectionId: doc.itemCollectionId.toString(),
      subitemId: doc.subitemId.toString(),
      position: doc.position,
    };
  }
}
