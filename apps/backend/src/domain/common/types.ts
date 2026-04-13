/**
 * Shared enums and types for the domain layer.
 * These reflect the original ER schema values exactly.
 */

/** Purpose of content assignment to an Item (Item_Contents.purpose) */
export enum ItemContentPurpose {
  STIMULUS = 'STIMULUS',
  SOLUTION = 'SOLUTION',
}

/** Ordering mode for Item_Collection */
export enum CollectionOrder {
  LINEAR = 'LINEAR',
  ARBITRARY = 'ARBITRARY',
}

/**
 * License types based on Creative Commons.
 * The original schema defines this as ENUM "CC-Licenses".
 */
export enum LicenseType {
  CC0 = 'CC0',
  CC_BY = 'CC-BY',
  CC_BY_SA = 'CC-BY-SA',
  CC_BY_NC = 'CC-BY-NC',
  CC_BY_NC_SA = 'CC-BY-NC-SA',
  CC_BY_ND = 'CC-BY-ND',
  CC_BY_NC_ND = 'CC-BY-NC-ND',
}

/**
 * Base repository interface providing standard CRUD operations.
 */
export interface CrudRepository<T, TCreate, TUpdate> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(input: TCreate): Promise<T>;
  update(id: string, input: TUpdate): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
