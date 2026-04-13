import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
    query: { fetchPolicy: 'network-only' },
  },
});

export function setupApollo() {
  provideApolloClient(apolloClient);
}
