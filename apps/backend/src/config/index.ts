import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.BACKEND_PORT || '4000', 10),
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb://admin:password@localhost:27017/task-bank?authSource=admin',
  nodeEnv: process.env.NODE_ENV || 'development',
};
