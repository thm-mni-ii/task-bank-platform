import { LicenseRepository } from '../../../../domain/license/repository';
import { License, CreateLicenseInput, UpdateLicenseInput } from '../../../../domain/license/entity';
import { LicenseModel } from '../models/license.model';
import { LicenseMapper } from '../mappers/license.mapper';

export class MongoLicenseRepository implements LicenseRepository {
  async findById(id: string): Promise<License | null> {
    const doc = await LicenseModel.findById(id);
    return doc ? LicenseMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<License[]> {
    const docs = await LicenseModel.find();
    return docs.map(LicenseMapper.toDomain);
  }

  async create(input: CreateLicenseInput): Promise<License> {
    const doc = await LicenseModel.create(input);
    return LicenseMapper.toDomain(doc);
  }

  async update(id: string, input: UpdateLicenseInput): Promise<License | null> {
    const doc = await LicenseModel.findByIdAndUpdate(id, input, { new: true });
    return doc ? LicenseMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await LicenseModel.findByIdAndDelete(id);
    return result !== null;
  }
}
