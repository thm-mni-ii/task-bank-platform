import { ItemContent, ItemContents } from '../../../../domain/item-content/entity';
import { ItemContentDocument } from '../models/item-content.model';
import { ItemContentsDocument } from '../models/item-contents.model';

export class ItemContentMapper {
  static toDomain(doc: ItemContentDocument): ItemContent {
    return {
      id: doc._id.toString(),
      licenseId: doc.licenseId.toString(),
      itemMaterialTypeId: doc.itemMaterialTypeId.toString(),
      authorId: doc.authorId.toString(),
      jsonSerializedContent: doc.jsonSerializedContent ?? null,
      blobSerializedContent: doc.blobSerializedContent ?? null,
    };
  }
}

export class ItemContentsMapper {
  static toDomain(doc: ItemContentsDocument): ItemContents {
    return {
      id: doc._id.toString(),
      itemMaterialId: doc.itemMaterialId.toString(),
      itemId: doc.itemId.toString(),
      purpose: doc.purpose,
    };
  }
}
