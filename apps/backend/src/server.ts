import { config } from './config';
import { connectToDatabase } from './infrastructure/persistence/mongo/connection';
import { createApp } from './app';
import { logger } from './shared/logging';

async function main() {
  await connectToDatabase();

  const server = createApp();

  server.listen(config.port, () => {
    logger.info(`GraphQL server running at http://localhost:${config.port}/graphql`);
    logger.info(`GraphiQL available at http://localhost:${config.port}/graphql`);
  });
}

main().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
