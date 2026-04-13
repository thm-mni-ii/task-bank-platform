import { AuthorService } from '../../../application/author/author.service';
import { LicenseService } from '../../../application/license/license.service';
import { TagService } from '../../../application/tag/tag.service';
import { ItemTypeService } from '../../../application/item-type/item-type.service';
import { ItemContentTypeService } from '../../../application/item-content-type/item-content-type.service';
import { ModifierService } from '../../../application/modifier/modifier.service';
import { ValidatorService } from '../../../application/validator/validator.service';
import { ItemService } from '../../../application/item/item.service';
import { ItemContentService } from '../../../application/item-content/item-content.service';
import { ItemCollectionService } from '../../../application/item-collection/item-collection.service';

import { createAuthorResolvers } from './author.resolver';
import { createLicenseResolvers } from './license.resolver';
import { createTagResolvers } from './tag.resolver';
import { createItemTypeResolvers } from './item-type.resolver';
import { createItemContentTypeResolvers } from './item-content-type.resolver';
import { createModifierResolvers } from './modifier.resolver';
import { createValidatorResolvers } from './validator.resolver';
import { createItemResolvers } from './item.resolver';
import { createItemContentResolvers } from './item-content.resolver';
import { createItemCollectionResolvers } from './item-collection.resolver';

import { GraphQLError } from 'graphql';
import {
  NotFoundError,
  ValidationError,
  ReferentialIntegrityError,
  ConflictError,
} from '../../../shared/errors';
import { logger } from '../../../shared/logging';

export interface Services {
  authorService: AuthorService;
  licenseService: LicenseService;
  tagService: TagService;
  itemTypeService: ItemTypeService;
  itemContentTypeService: ItemContentTypeService;
  modifierService: ModifierService;
  validatorService: ValidatorService;
  itemService: ItemService;
  itemContentService: ItemContentService;
  itemCollectionService: ItemCollectionService;
}

function mergeResolvers(...resolverSets: Record<string, Record<string, unknown>>[]) {
  const merged: Record<string, Record<string, unknown>> = {};
  for (const resolvers of resolverSets) {
    for (const [type, fields] of Object.entries(resolvers)) {
      if (!merged[type]) merged[type] = {};
      Object.assign(merged[type], fields);
    }
  }
  return merged;
}

function wrapWithErrorHandling(resolvers: Record<string, Record<string, unknown>>) {
  const wrapped: Record<string, Record<string, unknown>> = {};
  for (const [type, fields] of Object.entries(resolvers)) {
    wrapped[type] = {};
    for (const [field, resolver] of Object.entries(fields)) {
      if (typeof resolver === 'function') {
        wrapped[type][field] = async (...args: unknown[]) => {
          try {
            return await (resolver as Function)(...args);
          } catch (error) {
            if (error instanceof NotFoundError) {
              throw new GraphQLError(error.message, { extensions: { code: 'NOT_FOUND' } });
            }
            if (error instanceof ValidationError) {
              throw new GraphQLError(error.message, { extensions: { code: 'BAD_USER_INPUT' } });
            }
            if (error instanceof ReferentialIntegrityError) {
              throw new GraphQLError(error.message, { extensions: { code: 'BAD_USER_INPUT' } });
            }
            if (error instanceof ConflictError) {
              throw new GraphQLError(error.message, { extensions: { code: 'CONFLICT' } });
            }
            logger.error('Unexpected resolver error', error);
            throw new GraphQLError('Internal server error', {
              extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
          }
        };
      } else {
        wrapped[type][field] = resolver;
      }
    }
  }
  return wrapped;
}

export function buildResolvers(services: Services) {
  const baseResolvers = {
    Query: {
      health: () => ({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      }),
    },
    Mutation: {
      _empty: () => null,
    },
  };

  const merged = mergeResolvers(
    baseResolvers,
    createAuthorResolvers(services.authorService),
    createLicenseResolvers(services.licenseService),
    createTagResolvers(services.tagService),
    createItemTypeResolvers(services.itemTypeService),
    createItemContentTypeResolvers(services.itemContentTypeService),
    createModifierResolvers(services.modifierService),
    createValidatorResolvers(services.validatorService),
    createItemResolvers(services.itemService),
    createItemContentResolvers(services.itemContentService),
    createItemCollectionResolvers(services.itemCollectionService),
  );

  return wrapWithErrorHandling(merged);
}
