import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { buildTypeDefs } from './interfaces/graphql/schema';
import { buildResolvers, Services } from './interfaces/graphql/resolvers';
import { createContext } from './interfaces/graphql/context';
import { JSONResolver } from 'graphql-scalars';

// Repositories
import { MongoAuthorRepository } from './infrastructure/persistence/mongo/repositories/author.repository';
import { MongoLicenseRepository } from './infrastructure/persistence/mongo/repositories/license.repository';
import { MongoTagRepository } from './infrastructure/persistence/mongo/repositories/tag.repository';
import { MongoItemTagRepository } from './infrastructure/persistence/mongo/repositories/item-tag.repository';
import { MongoItemContentTagRepository } from './infrastructure/persistence/mongo/repositories/item-content-tag.repository';
import { MongoItemTypeRepository } from './infrastructure/persistence/mongo/repositories/item-type.repository';
import { MongoItemContentTypeRepository } from './infrastructure/persistence/mongo/repositories/item-content-type.repository';
import { MongoItemContentTypeAssignmentRepository } from './infrastructure/persistence/mongo/repositories/item-content-type-assignment.repository';
import { MongoModifierRepository } from './infrastructure/persistence/mongo/repositories/modifier.repository';
import { MongoItemModifierRepository } from './infrastructure/persistence/mongo/repositories/item-modifier.repository';
import { MongoValidatorRepository } from './infrastructure/persistence/mongo/repositories/validator.repository';
import { MongoItemValidatorRepository } from './infrastructure/persistence/mongo/repositories/item-validator.repository';
import { MongoItemRepository } from './infrastructure/persistence/mongo/repositories/item.repository';
import { MongoItemRepresentationTemplateRepository } from './infrastructure/persistence/mongo/repositories/item-representation-template.repository';
import { MongoItemContentRepository } from './infrastructure/persistence/mongo/repositories/item-content.repository';
import { MongoItemContentsRepository } from './infrastructure/persistence/mongo/repositories/item-contents.repository';
import { MongoItemCollectionRepository } from './infrastructure/persistence/mongo/repositories/item-collection.repository';
import { MongoItemCollectionSubItemRepository } from './infrastructure/persistence/mongo/repositories/item-collection-sub-item.repository';

// Services
import { AuthorService } from './application/author/author.service';
import { LicenseService } from './application/license/license.service';
import { TagService } from './application/tag/tag.service';
import { ItemTypeService } from './application/item-type/item-type.service';
import { ItemContentTypeService } from './application/item-content-type/item-content-type.service';
import { ModifierService } from './application/modifier/modifier.service';
import { ValidatorService } from './application/validator/validator.service';
import { ItemService } from './application/item/item.service';
import { ItemContentService } from './application/item-content/item-content.service';
import { ItemCollectionService } from './application/item-collection/item-collection.service';

export function createApp() {
  // --- Instantiate repositories ---
  const authorRepo = new MongoAuthorRepository();
  const licenseRepo = new MongoLicenseRepository();
  const tagRepo = new MongoTagRepository();
  const itemTagRepo = new MongoItemTagRepository();
  const itemContentTagRepo = new MongoItemContentTagRepository();
  const itemTypeRepo = new MongoItemTypeRepository();
  const itemContentTypeRepo = new MongoItemContentTypeRepository();
  const itemContentTypeAssignmentRepo = new MongoItemContentTypeAssignmentRepository();
  const modifierRepo = new MongoModifierRepository();
  const itemModifierRepo = new MongoItemModifierRepository();
  const validatorRepo = new MongoValidatorRepository();
  const itemValidatorRepo = new MongoItemValidatorRepository();
  const itemRepo = new MongoItemRepository();
  const templateRepo = new MongoItemRepresentationTemplateRepository();
  const itemContentRepo = new MongoItemContentRepository();
  const itemContentsRepo = new MongoItemContentsRepository();
  const itemCollectionRepo = new MongoItemCollectionRepository();
  const itemCollectionSubItemRepo = new MongoItemCollectionSubItemRepository();

  // --- Instantiate services ---
  const services: Services = {
    authorService: new AuthorService(authorRepo),
    licenseService: new LicenseService(licenseRepo),
    tagService: new TagService(tagRepo, itemTagRepo, itemContentTagRepo),
    itemTypeService: new ItemTypeService(itemTypeRepo),
    itemContentTypeService: new ItemContentTypeService(
      itemContentTypeRepo,
      itemContentTypeAssignmentRepo,
    ),
    modifierService: new ModifierService(modifierRepo, itemModifierRepo),
    validatorService: new ValidatorService(validatorRepo, itemValidatorRepo),
    itemService: new ItemService(itemRepo, templateRepo, authorRepo, licenseRepo, itemTypeRepo),
    itemContentService: new ItemContentService(
      itemContentRepo,
      itemContentsRepo,
      authorRepo,
      licenseRepo,
    ),
    itemCollectionService: new ItemCollectionService(
      itemCollectionRepo,
      itemCollectionSubItemRepo,
      itemRepo,
    ),
  };

  // --- Build GraphQL schema ---
  const typeDefs = buildTypeDefs();
  const resolvers = buildResolvers(services);

  const yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers: {
        ...resolvers,
        JSON: JSONResolver,
      },
    }),
    context: createContext,
    graphiql: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'OPTIONS'],
    },
  });

  return createServer(yoga);
}
