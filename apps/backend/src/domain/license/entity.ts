import { LicenseType } from '../common/types';

/**
 * Entity: License
 * Original schema: License (license_id PK, license ENUM "CC-Licenses")
 * Represents the license under which an Item or Item_Content is provided.
 */
export interface License {
  id: string;
  license: LicenseType;
}

export interface CreateLicenseInput {
  license: LicenseType;
}

export interface UpdateLicenseInput {
  license?: LicenseType;
}
