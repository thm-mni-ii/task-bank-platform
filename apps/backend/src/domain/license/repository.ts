import { CrudRepository } from '../common/types';
import { License, CreateLicenseInput, UpdateLicenseInput } from './entity';

export type LicenseRepository = CrudRepository<License, CreateLicenseInput, UpdateLicenseInput>;
