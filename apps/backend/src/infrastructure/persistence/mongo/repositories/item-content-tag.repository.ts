import { ItemContentTagRepository } from '../../../../domain/tag/repository';
import { ItemContentTag } from '../../../../domain/tag/entity';
import { ItemContentTagModel } from '../models/item-content-tag.model';
import { ItemContentTagMapper } from '../mappers/tag.mapper';

export class MongoItemContentTagRepository implements ItemContentTagRepository {
  async findByItemId(itemId: string): Promise<ItemContentTag[]> {
    const docs = await ItemContentTagModel.find({ itemId });
    return docs.map(ItemContentTagMapper.toDomain);
  }

  async findByTagId(tagId: string): Promise<ItemContentTag[]> {
    const docs = await ItemContentTagModel.find({ tagId });
    return docs.map(ItemContentTagMapper.toDomain);
  }

  async create(input: ItemContentTag): Promise<ItemContentTag> {
    const doc = await ItemContentTagModel.create(input);
    return ItemContentTagMapper.toDomain(doc);
  }

  async delete(itemId: string, tagId: string): Promise<boolean> {
    const result = await ItemContentTagModel.findOneAndDelete({ itemId, tagId });
    return result !== null;
  }

  async deleteAllByItemId(itemId: string): Promise<number> {
    const result = await ItemContentTagModel.deleteMany({ itemId });
    return result.deletedCount;
  }
}
