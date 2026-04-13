import { ItemTagRepository } from '../../../../domain/tag/repository';
import { ItemTag } from '../../../../domain/tag/entity';
import { ItemTagModel } from '../models/item-tag.model';
import { ItemTagMapper } from '../mappers/tag.mapper';

export class MongoItemTagRepository implements ItemTagRepository {
  async findByItemId(itemId: string): Promise<ItemTag[]> {
    const docs = await ItemTagModel.find({ itemId });
    return docs.map(ItemTagMapper.toDomain);
  }

  async findByTagId(tagId: string): Promise<ItemTag[]> {
    const docs = await ItemTagModel.find({ tagId });
    return docs.map(ItemTagMapper.toDomain);
  }

  async create(input: ItemTag): Promise<ItemTag> {
    const doc = await ItemTagModel.create(input);
    return ItemTagMapper.toDomain(doc);
  }

  async delete(itemId: string, tagId: string): Promise<boolean> {
    const result = await ItemTagModel.findOneAndDelete({ itemId, tagId });
    return result !== null;
  }

  async deleteAllByItemId(itemId: string): Promise<number> {
    const result = await ItemTagModel.deleteMany({ itemId });
    return result.deletedCount;
  }
}
