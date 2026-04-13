/**
 * Entity: Item
 * Original schema: Item (item_id PK, author_id FK, license_id FK, item_type_id FK,
 *                        item_template_id FK, root_item_id FK NULLABLE)
 * Represents one concrete task in the learning system.
 * Variants are separate Items linked through root_item_id and Modifiers.
 *
 * Entity: Item_Representation_Template
 * Original schema: Item_Representation_Template (item_template_id PK, template JSON)
 * Defines a reusable representation structure for Items.
 */
export interface Item {
  id: string;
  authorId: string;
  licenseId: string;
  itemTypeId: string;
  itemTemplateId: string;
  rootItemId: string | null;
}

export interface CreateItemInput {
  authorId: string;
  licenseId: string;
  itemTypeId: string;
  itemTemplateId: string;
  rootItemId?: string | null;
}

export interface UpdateItemInput {
  authorId?: string;
  licenseId?: string;
  itemTypeId?: string;
  itemTemplateId?: string;
  rootItemId?: string | null;
}

export interface ItemRepresentationTemplate {
  id: string;
  template: Record<string, unknown>;
}

export interface CreateItemRepresentationTemplateInput {
  template: Record<string, unknown>;
}

export interface UpdateItemRepresentationTemplateInput {
  template?: Record<string, unknown>;
}
