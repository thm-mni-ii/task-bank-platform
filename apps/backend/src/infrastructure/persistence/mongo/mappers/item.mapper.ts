import { Item, ItemRepresentationTemplate } from '../../../../domain/item/entity';
import { ItemDocument } from '../models/item.model';
import { ItemRepresentationTemplateDocument } from '../models/item-representation-template.model';

export class ItemMapper {
  static toDomain(doc: ItemDocument): Item {
    return {
      id: doc._id.toString(),
      authorId: doc.authorId.toString(),
      licenseId: doc.licenseId.toString(),
      itemTypeId: doc.itemTypeId.toString(),
      itemTemplateId: doc.itemTemplateId.toString(),
      rootItemId: doc.rootItemId ? doc.rootItemId.toString() : null,
    };
  }
}

export class ItemRepresentationTemplateMapper {
  static toDomain(doc: ItemRepresentationTemplateDocument): ItemRepresentationTemplate {
    return {
      id: doc._id.toString(),
      template: doc.template,
    };
  }
}
