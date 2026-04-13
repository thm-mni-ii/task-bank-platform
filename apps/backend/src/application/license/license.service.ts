import { LicenseRepository } from '../../domain/license/repository';
import { License, CreateLicenseInput, UpdateLicenseInput } from '../../domain/license/entity';
import { NotFoundError } from '../../shared/errors';

export class LicenseService {
  constructor(private readonly licenseRepo: LicenseRepository) {}

  async findById(id: string): Promise<License> {
    const license = await this.licenseRepo.findById(id);
    if (!license) throw new NotFoundError('License', id);
    return license;
  }

  async findAll(): Promise<License[]> {
    return this.licenseRepo.findAll();
  }

  async create(input: CreateLicenseInput): Promise<License> {
    return this.licenseRepo.create(input);
  }

  async update(id: string, input: UpdateLicenseInput): Promise<License> {
    const license = await this.licenseRepo.update(id, input);
    if (!license) throw new NotFoundError('License', id);
    return license;
  }

  async delete(id: string): Promise<boolean> {
    return this.licenseRepo.delete(id);
  }
}
