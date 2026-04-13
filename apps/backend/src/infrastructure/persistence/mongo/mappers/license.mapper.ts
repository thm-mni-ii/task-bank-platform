import { License } from '../../../../domain/license/entity';
import { LicenseDocument } from '../models/license.model';

export class LicenseMapper {
  static toDomain(doc: LicenseDocument): License {
    return {
      id: doc._id.toString(),
      license: doc.license,
    };
  }
}
