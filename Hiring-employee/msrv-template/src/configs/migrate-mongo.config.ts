/* eslint-disable prettier/prettier */
import path from 'path';
import mongoose from 'mongoose';
import logger from './logger.config';
// Define the configuration interface for migrate-mongo
// This ensures type safety and clarity for the config object
interface MigrateMongoConfig {
  mongodb: {
    url: string;
    databaseName: string;
    options: mongoose.ConnectOptions;
  };
  migrationsDir: string;
  changelogCollectionName: string;
  migrationFileExtension: string;
  useLock: boolean;
  logger: {
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
  };
}
// Configuration object for migrate-mongo
// This defines how migrations are executed and tracked
const config: MigrateMongoConfig = {
  mongodb: {
    url: process.env.DATABASE_BASE_URL || '',
    databaseName: process.env.DB_NAME || '',
    options: {}, // Remove deprecated options
  },
  migrationsDir: path.join(__dirname, '../db/migrations'),
  changelogCollectionName: 'migration_status',
  migrationFileExtension: '.ts',
  useLock: true,
  logger: {
    info: (msg: string) => logger.info(msg),
    warn: (msg: string) => logger.warn(msg),
    error: (msg: string) => logger.error(msg),
  },
};

export default config;