import { LicenseService } from '../../../application/license/license.service';
import { CreateLicenseInput, UpdateLicenseInput } from '../../../domain/license/entity';

export const createLicenseResolvers = (service: LicenseService) => ({
  Query: {
    licenses: () => service.findAll(),
    license: (_: unknown, { id }: { id: string }) => service.findById(id),
  },
  Mutation: {
    createLicense: (_: unknown, { input }: { input: CreateLicenseInput }) => service.create(input),
    updateLicense: (_: unknown, { id, input }: { id: string; input: UpdateLicenseInput }) =>
      service.update(id, input),
    deleteLicense: (_: unknown, { id }: { id: string }) => service.delete(id),
  },
});
