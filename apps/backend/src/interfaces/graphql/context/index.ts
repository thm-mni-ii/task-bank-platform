/**
 * GraphQL context factory.
 * Currently minimal — prepared for future authentication extension.
 */
export interface GraphQLContext {
  // Future: user, auth token, etc.
  requestId: string;
}

let requestCounter = 0;

export function createContext(): GraphQLContext {
  return {
    requestId: `req-${++requestCounter}-${Date.now()}`,
  };
}
