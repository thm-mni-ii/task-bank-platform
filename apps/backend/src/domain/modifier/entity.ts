/**
 * Entity: Modifier
 * Original schema: Modifier (modifier_id PK, description VARCHAR, modifier VARCHAR)
 * Represents a modification concept that can be applied to an Item to create a variant.
 * This models horizontal task variation.
 *
 * Entity: Item_Modifier (junction)
 * Original schema: Item_Modifier (item_id PK FK, modifier_id PK FK)
 */
export interface Modifier {
  id: string;
  description: string;
  modifier: string;
}

export interface CreateModifierInput {
  description: string;
  modifier: string;
}

export interface UpdateModifierInput {
  description?: string;
  modifier?: string;
}

/** Junction entity: Item_Modifier */
export interface ItemModifier {
  itemId: string;
  modifierId: string;
}
