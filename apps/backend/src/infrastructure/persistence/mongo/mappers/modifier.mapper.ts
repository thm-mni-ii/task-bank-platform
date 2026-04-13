import { Modifier, ItemModifier } from '../../../../domain/modifier/entity';
import { ModifierDocument } from '../models/modifier.model';
import { ItemModifierDocument } from '../models/item-modifier.model';

export class ModifierMapper {
  static toDomain(doc: ModifierDocument): Modifier {
    return {
      id: doc._id.toString(),
      description: doc.description,
      modifier: doc.modifier,
    };
  }
}

export class ItemModifierMapper {
  static toDomain(doc: ItemModifierDocument): ItemModifier {
    return {
      itemId: doc.itemId.toString(),
      modifierId: doc.modifierId.toString(),
    };
  }
}
