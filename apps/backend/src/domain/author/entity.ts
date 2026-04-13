/**
 * Entity: Author
 * Original schema: Author (author_id PK, descriptor, mail)
 * Represents the creator or responsible person for Items and Item_Content.
 */
export interface Author {
  id: string;
  descriptor: string;
  mail: string;
}

export interface CreateAuthorInput {
  descriptor: string;
  mail: string;
}

export interface UpdateAuthorInput {
  descriptor?: string;
  mail?: string;
}
