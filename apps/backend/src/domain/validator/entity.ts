/**
 * Entity: Validator
 * Original schema: Validator (validator_id PK, description VARCHAR, validator VARCHAR)
 * Represents a reference to an external function that can validate an Item.
 *
 * Entity: Item_Validator (junction)
 * Original schema: Item_Validator (validator_id PK FK, item_id PK FK)
 */
export interface Validator {
  id: string;
  description: string;
  validator: string;
}

export interface CreateValidatorInput {
  description: string;
  validator: string;
}

export interface UpdateValidatorInput {
  description?: string;
  validator?: string;
}

/** Junction entity: Item_Validator */
export interface ItemValidator {
  itemId: string;
  validatorId: string;
}
