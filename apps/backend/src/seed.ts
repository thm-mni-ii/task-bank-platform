import { config } from './config';
import { connectToDatabase, disconnectFromDatabase } from './infrastructure/persistence/mongo/connection';
import { AuthorModel } from './infrastructure/persistence/mongo/models/author.model';
import { LicenseModel } from './infrastructure/persistence/mongo/models/license.model';
import { TagModel } from './infrastructure/persistence/mongo/models/tag.model';
import { ItemTypeModel } from './infrastructure/persistence/mongo/models/item-type.model';
import { ItemContentTypeModel } from './infrastructure/persistence/mongo/models/item-content-type.model';
import { ModifierModel } from './infrastructure/persistence/mongo/models/modifier.model';
import { ValidatorModel } from './infrastructure/persistence/mongo/models/validator.model';
import { ItemRepresentationTemplateModel } from './infrastructure/persistence/mongo/models/item-representation-template.model';
import { ItemModel } from './infrastructure/persistence/mongo/models/item.model';
import { ItemContentModel } from './infrastructure/persistence/mongo/models/item-content.model';
import { ItemContentsModel } from './infrastructure/persistence/mongo/models/item-contents.model';
import { ItemTagModel } from './infrastructure/persistence/mongo/models/item-tag.model';
import { ItemModifierModel } from './infrastructure/persistence/mongo/models/item-modifier.model';
import { ItemValidatorModel } from './infrastructure/persistence/mongo/models/item-validator.model';
import { ItemCollectionModel } from './infrastructure/persistence/mongo/models/item-collection.model';
import { ItemCollectionSubItemModel } from './infrastructure/persistence/mongo/models/item-collection-sub-item.model';
import { ItemContentTypeAssignmentModel } from './infrastructure/persistence/mongo/models/item-content-type-assignment.model';
import { logger } from './shared/logging';

async function seed() {
  logger.info('Connecting to database...');
  await connectToDatabase();

  logger.info('Clearing existing data...');
  await Promise.all([
    ItemCollectionSubItemModel.deleteMany({}),
    ItemCollectionModel.deleteMany({}),
    ItemContentsModel.deleteMany({}),
    ItemContentModel.deleteMany({}),
    ItemValidatorModel.deleteMany({}),
    ItemModifierModel.deleteMany({}),
    ItemTagModel.deleteMany({}),
    ItemContentTypeAssignmentModel.deleteMany({}),
    ItemModel.deleteMany({}),
    ItemRepresentationTemplateModel.deleteMany({}),
    ValidatorModel.deleteMany({}),
    ModifierModel.deleteMany({}),
    ItemContentTypeModel.deleteMany({}),
    ItemTypeModel.deleteMany({}),
    TagModel.deleteMany({}),
    LicenseModel.deleteMany({}),
    AuthorModel.deleteMany({}),
  ]);

  logger.info('Seeding authors...');
  const authors = await AuthorModel.insertMany([
    { descriptor: 'Max Mustermann', mail: 'max@example.com' },
    { descriptor: 'Erika Musterfrau', mail: 'erika@example.com' },
    { descriptor: 'System', mail: 'system@task-bank.local' },
  ]);

  logger.info('Seeding licenses...');
  const licenses = await LicenseModel.insertMany([
    { license: 'CC0' },
    { license: 'CC_BY' },
    { license: 'CC_BY_SA' },
    { license: 'CC_BY_NC' },
  ]);

  logger.info('Seeding tags...');
  const parentTag = await TagModel.create({ tag: 'Mathematik', description: 'Mathematische Aufgaben' });
  const tags = await TagModel.insertMany([
    { tag: 'Algebra', description: 'Algebraische Aufgaben', parentTagId: parentTag._id },
    { tag: 'Geometrie', description: 'Geometrische Aufgaben', parentTagId: parentTag._id },
    { tag: 'Informatik', description: 'Informatik-Aufgaben' },
    { tag: 'Programmierung', description: 'Programmieraufgaben' },
  ]);

  logger.info('Seeding item types...');
  const itemTypes = await ItemTypeModel.insertMany([
    { itemTypeName: 'Multiple Choice', description: 'Aufgabe mit mehreren Antwortmöglichkeiten' },
    { itemTypeName: 'Free Text', description: 'Freitextaufgabe' },
    { itemTypeName: 'Code', description: 'Programmieraufgabe mit Code-Editor' },
  ]);

  logger.info('Seeding item content types...');
  const contentTypes = await ItemContentTypeModel.insertMany([
    { itemContentTypeName: 'HTML', description: 'HTML-basierter Inhalt' },
    { itemContentTypeName: 'Markdown', description: 'Markdown-basierter Inhalt' },
    { itemContentTypeName: 'Image', description: 'Bild-Inhalt' },
  ]);

  logger.info('Seeding content type assignments...');
  await ItemContentTypeAssignmentModel.insertMany([
    { itemTypeId: itemTypes[0]._id, itemContentTypeId: contentTypes[0]._id },
    { itemTypeId: itemTypes[0]._id, itemContentTypeId: contentTypes[2]._id },
    { itemTypeId: itemTypes[1]._id, itemContentTypeId: contentTypes[1]._id },
    { itemTypeId: itemTypes[2]._id, itemContentTypeId: contentTypes[0]._id },
  ]);

  logger.info('Seeding modifiers...');
  const modifiers = await ModifierModel.insertMany([
    { modifier: 'shuffle-options', description: 'Shuffles answer options randomly' },
    { modifier: 'time-limit', description: 'Adds a time limit to the item' },
  ]);

  logger.info('Seeding validators...');
  const validators = await ValidatorModel.insertMany([
    { validator: 'exact-match', description: 'Compares answer exactly' },
    { validator: 'regex-match', description: 'Validates answer against a regex pattern' },
    { validator: 'code-runner', description: 'Runs code and compares output' },
  ]);

  logger.info('Seeding templates...');
  const templates = await ItemRepresentationTemplateModel.insertMany([
    { template: { layout: 'vertical', showHints: true, maxAttempts: 3 } },
    { template: { layout: 'horizontal', codeLanguage: 'javascript', showLineNumbers: true } },
  ]);

  logger.info('Seeding items...');
  const items = await ItemModel.insertMany([
    { authorId: authors[0]._id, licenseId: licenses[1]._id, itemTypeId: itemTypes[0]._id, itemTemplateId: templates[0]._id },
    { authorId: authors[0]._id, licenseId: licenses[0]._id, itemTypeId: itemTypes[1]._id, itemTemplateId: templates[0]._id },
    { authorId: authors[1]._id, licenseId: licenses[2]._id, itemTypeId: itemTypes[2]._id, itemTemplateId: templates[1]._id },
    { authorId: authors[2]._id, licenseId: licenses[0]._id, itemTypeId: itemTypes[0]._id, itemTemplateId: templates[0]._id },
    { authorId: authors[1]._id, licenseId: licenses[1]._id, itemTypeId: itemTypes[1]._id, itemTemplateId: templates[0]._id, rootItemId: null },
  ]);

  logger.info('Seeding item tags...');
  await ItemTagModel.insertMany([
    { itemId: items[0]._id, tagId: parentTag._id },
    { itemId: items[0]._id, tagId: tags[0]._id },
    { itemId: items[1]._id, tagId: parentTag._id },
    { itemId: items[1]._id, tagId: tags[1]._id },
    { itemId: items[2]._id, tagId: tags[2]._id },
    { itemId: items[2]._id, tagId: tags[3]._id },
  ]);

  logger.info('Seeding item modifiers...');
  await ItemModifierModel.insertMany([
    { itemId: items[0]._id, modifierId: modifiers[0]._id },
    { itemId: items[3]._id, modifierId: modifiers[0]._id },
    { itemId: items[3]._id, modifierId: modifiers[1]._id },
  ]);

  logger.info('Seeding item validators...');
  await ItemValidatorModel.insertMany([
    { itemId: items[0]._id, validatorId: validators[0]._id },
    { itemId: items[1]._id, validatorId: validators[0]._id },
    { itemId: items[2]._id, validatorId: validators[2]._id },
    { itemId: items[3]._id, validatorId: validators[1]._id },
  ]);

  logger.info('Seeding item contents...');
  const itemContents = await ItemContentModel.insertMany([
    { licenseId: licenses[0]._id, itemMaterialTypeId: contentTypes[0]._id, authorId: authors[0]._id, jsonSerializedContent: { question: 'Was ist 2 + 2?', options: ['3', '4', '5', '6'] } },
    { licenseId: licenses[0]._id, itemMaterialTypeId: contentTypes[0]._id, authorId: authors[0]._id, jsonSerializedContent: { answer: '4', explanation: 'Einfache Addition' } },
    { licenseId: licenses[1]._id, itemMaterialTypeId: contentTypes[1]._id, authorId: authors[1]._id, jsonSerializedContent: { text: '# Beschreibe den Algorithmus\n\nErkläre in eigenen Worten...' } },
    { licenseId: licenses[2]._id, itemMaterialTypeId: contentTypes[0]._id, authorId: authors[1]._id, jsonSerializedContent: { code: 'function add(a, b) { return a + b; }', tests: ['add(1,2) === 3'] } },
  ]);

  logger.info('Seeding item contents assignments...');
  await ItemContentsModel.insertMany([
    { itemMaterialId: itemContents[0]._id, itemId: items[0]._id, purpose: 'STIMULUS' },
    { itemMaterialId: itemContents[1]._id, itemId: items[0]._id, purpose: 'SOLUTION' },
    { itemMaterialId: itemContents[2]._id, itemId: items[1]._id, purpose: 'STIMULUS' },
    { itemMaterialId: itemContents[3]._id, itemId: items[2]._id, purpose: 'STIMULUS' },
  ]);

  logger.info('Seeding item collections...');
  const collection = await ItemCollectionModel.create({
    parentItemId: items[0]._id,
    order: 'LINEAR',
  });

  logger.info('Seeding collection sub-items...');
  await ItemCollectionSubItemModel.insertMany([
    { itemCollectionId: collection._id, subitemId: items[1]._id, position: 0 },
    { itemCollectionId: collection._id, subitemId: items[2]._id, position: 1 },
    { itemCollectionId: collection._id, subitemId: items[3]._id, position: 2 },
  ]);

  logger.info('Seed completed successfully!');
  await disconnectFromDatabase();
  process.exit(0);
}

seed().catch((err) => {
  logger.error('Seed failed:', err);
  process.exit(1);
});
