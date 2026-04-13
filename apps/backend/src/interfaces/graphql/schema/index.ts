import { baseTypeDefs } from './base.schema';
import { authorTypeDefs } from './author.schema';
import { licenseTypeDefs } from './license.schema';
import { tagTypeDefs } from './tag.schema';
import { itemTypeTypeDefs } from './item-type.schema';
import { itemContentTypeTypeDefs } from './item-content-type.schema';
import { modifierTypeDefs } from './modifier.schema';
import { validatorTypeDefs } from './validator.schema';
import { itemTypeDefs } from './item.schema';
import { itemContentTypeDefs } from './item-content.schema';
import { itemCollectionTypeDefs } from './item-collection.schema';

export function buildTypeDefs(): string {
  return [
    baseTypeDefs,
    authorTypeDefs,
    licenseTypeDefs,
    tagTypeDefs,
    itemTypeTypeDefs,
    itemContentTypeTypeDefs,
    modifierTypeDefs,
    validatorTypeDefs,
    itemTypeDefs,
    itemContentTypeDefs,
    itemCollectionTypeDefs,
  ].join('\n');
}
