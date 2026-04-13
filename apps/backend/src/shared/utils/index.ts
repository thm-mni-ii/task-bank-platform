import mongoose from 'mongoose';

/**
 * Validates that a string is a valid MongoDB ObjectId.
 */
export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Creates a new MongoDB ObjectId string.
 */
export function newObjectId(): string {
  return new mongoose.Types.ObjectId().toHexString();
}
