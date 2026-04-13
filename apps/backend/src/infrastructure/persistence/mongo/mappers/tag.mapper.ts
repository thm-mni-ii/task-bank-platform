import { Tag, ItemTag, ItemContentTag } from '../../../../domain/tag/entity';
import { TagDocument } from '../models/tag.model';
import { ItemTagDocument } from '../models/item-tag.model';
import { ItemContentTagDocument } from '../models/item-content-tag.model';

export class TagMapper {
  static toDomain(doc: TagDocument): Tag {
    return {
      id: doc._id.toString(),
      parentTagId: doc.parentTagId ? doc.parentTagId.toString() : null,
      tag: doc.tag,
      description: doc.description,
    };
  }
}

export class ItemTagMapper {
  static toDomain(doc: ItemTagDocument): ItemTag {
    return {
      itemId: doc.itemId.toString(),
      tagId: doc.tagId.toString(),
    };
  }
}

export class ItemContentTagMapper {
  static toDomain(doc: ItemContentTagDocument): ItemContentTag {
    return {
      itemId: doc.itemId.toString(),
      tagId: doc.tagId.toString(),
    };
  }
}
