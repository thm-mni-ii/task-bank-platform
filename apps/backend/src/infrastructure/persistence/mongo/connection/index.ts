import mongoose from 'mongoose';
import { config } from '../../../../config';
import { logger } from '../../../../shared/logging';

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
}

/**
 * Returns a Mongoose ClientSession for use in transactions.
 */
export async function startSession(): Promise<mongoose.ClientSession> {
  return mongoose.startSession();
}
