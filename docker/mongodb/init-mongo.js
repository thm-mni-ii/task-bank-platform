/* eslint-disable no-undef */
db = db.getSiblingDB('task-bank');

// Create collections for all entities
db.createCollection('items');
db.createCollection('item_representation_templates');
db.createCollection('item_contents');
db.createCollection('item_contents_assignments');
db.createCollection('tags');
db.createCollection('item_tags');
db.createCollection('item_content_tags');
db.createCollection('authors');
db.createCollection('licenses');
db.createCollection('modifiers');
db.createCollection('item_modifiers');
db.createCollection('validators');
db.createCollection('item_validators');
db.createCollection('item_types');
db.createCollection('item_content_types');
db.createCollection('item_content_type_assignments');
db.createCollection('item_collections');
db.createCollection('item_collection_sub_items');

// Compound indexes for junction collections to prevent duplicates
db.item_tags.createIndex({ itemId: 1, tagId: 1 }, { unique: true });
db.item_content_tags.createIndex({ itemId: 1, tagId: 1 }, { unique: true });
db.item_modifiers.createIndex({ itemId: 1, modifierId: 1 }, { unique: true });
db.item_validators.createIndex({ validatorId: 1, itemId: 1 }, { unique: true });
db.item_content_type_assignments.createIndex(
  { itemTypeId: 1, itemContentTypeId: 1 },
  { unique: true },
);
db.item_collection_sub_items.createIndex({ itemCollectionId: 1, subitemId: 1 }, { unique: true });

print('Database initialized with collections and indexes.');
