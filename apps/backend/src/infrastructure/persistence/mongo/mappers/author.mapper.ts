import { Author } from '../../../../domain/author/entity';
import { AuthorDocument } from '../models/author.model';

export class AuthorMapper {
  static toDomain(doc: AuthorDocument): Author {
    return {
      id: doc._id.toString(),
      descriptor: doc.descriptor,
      mail: doc.mail,
    };
  }
}
