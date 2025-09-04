/* eslint-disable prettier/prettier */
import fs from 'fs';
import path from 'path';
import mongoose, { Schema } from 'mongoose';
import MigrationStatus from '../db/models/MigrationStatus';
import { runMigrations, rollbackMigration } from '../db/migrationConfig';
import logger from '../utils/logger';
import { Migration } from '../db/migrationConfig/migration';
import connectDB from '../configs/db.config';
import readline from 'readline';
import { JsonSchema } from '../types/JsonSchema';
import { SchemaDefinition } from 'mongoose';
import { runSeeders } from '../utils/db/seeding.utility'; // Added imports

const migrationDir = path.join(__dirname, '../db/migrations');
const modelsDir = path.join(__dirname, '../models');

/**
 * Returns the current timestamp in UTC format as a string.
 *
 * The timestamp is in the format `YYYYMMDDHHMM` where:
 * - `YYYY` is the current year in four digits
 * - `MM` is the month as a zero-padded two-digit value
 * - `DD` is the day as a zero-padded two-digit value
 * - `HH` is the hour as a zero-padded two-digit value
 * - `MM` is the minute as a zero-padded two-digit value
 *
 * @returns The current timestamp as a string
 */
export const getTimestamp = (): string => {
  const now = new Date();
  return `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}`;
};

/**
 * Generates a migration template as a string.
 *
 * @param {string} name The name of the migration
 * @param {string} timestamp The timestamp of the migration
 * @param {boolean} [hasModel=false] Whether the migration should have a model
 * @param {string} [schemaDefinition] The schema definition of the model
 * @returns The migration template as a string
 */
export const generateMigrationTemplate = (name: string, timestamp: string, hasModel: boolean = false, schemaDefinition?: string): string => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  if (hasModel && schemaDefinition) {
    return `
import mongoose from 'mongoose'
import { ${capitalizedName} } from '../../models/${name}.model'
import { Migration } from '../migrationConfig/migration'

export default class ${capitalizedName}Migration extends Migration {
  version = '${timestamp}_${name.toLowerCase()}'
  name = '${name}'

  /**
   * Creates the collection with the schema definition.
   *
   * @param {mongoose.Connection} db The database connection
   */
  async up(db: mongoose.Connection): Promise<void> {
    await db.createCollection('${name.toLowerCase()}', {
      validator: {
        $jsonSchema: ${schemaDefinition}
      }
    })
  }

  /**
   * Drops the collection.
   *
   * @param {mongoose.Connection} db The database connection
   */
  async down(db: mongoose.Connection): Promise<void> {
    await db.collection('${name.toLowerCase()}').drop()
  }
}
`;
  }
  
  return `
import mongoose from 'mongoose';
import { Migration } from '../migrationConfig/migration';

export default class ${capitalizedName}Migration extends Migration {
  version = '${timestamp}_${name.toLowerCase()}';
  name = '${name}'
  async up(db: mongoose.Connection): Promise<void> {
    await db.createCollection('${name.toLowerCase()}');
  }

  async down(db: mongoose.Connection): Promise<void> {
    await db.collection('${name.toLowerCase()}').drop();
  }
}
`;
};

/**
 * Checks if a model file exists in the models directory.
 *
 * @param {string} name - The name of the model to check
 * @returns {boolean} Whether the model exists or not
 */
export const checkModelExists = (name: string): boolean => {
  const modelFile = path.join(modelsDir, `${name}.model.ts`);
  const exists = fs.existsSync(modelFile);
  logger.debug(`Checking model existence: ${modelFile} - ${exists ? 'found' : 'not found'}`);
  return exists;
};

/**
 * Given a model name, loads the model and its schema, and transforms the schema into a JSON schema.
 * If the model does not exist, or the schema is invalid, this function returns undefined.
 * @param {string} name - The name of the model to load
 * @returns {Promise<string | undefined>} - The JSON schema as a string, or undefined if the model could not be loaded
 */
export const getModelSchema = async (name: string): Promise<string | undefined> => {
  try {
    const modelModule = await import(path.join(modelsDir, `${name}.model`));
    const modelName = name.charAt(0).toUpperCase() + name.slice(1);
    const model = modelModule[modelName] as mongoose.Model<unknown>;
    if (!model) {
      logger.warn(`No exported model named '${modelName}' found in ${name}.model.ts`);
      return undefined;
    }
    if (!model.schema) {
      logger.warn(`Model ${modelName} loaded but has no schema`);
      return undefined;
    }
    const schema = model.schema as Schema;
    const jsonSchema: JsonSchema = { bsonType: 'object', properties: {} };
    const schemaObj = schema.obj as Record<string, SchemaDefinition>;
    for (const [field, definition] of Object.entries(schemaObj)) {
      let fieldType: string;
      if (definition.type === String) fieldType = 'string';
      else if (definition.type === Number) fieldType = 'number';
      else if (definition.type === Boolean) fieldType = 'boolean';
      else if (definition.type === Date) fieldType = 'date';
      else {
        logger.warn(`Unsupported type for field ${field} in ${name} model, defaulting to string`);
        fieldType = 'string';
      }
      jsonSchema.properties[field] = { bsonType: fieldType.toLowerCase() };
      if (definition.required) {
        jsonSchema.required = jsonSchema.required || [];
        jsonSchema.required.push(field);
      }
    }
    if ('createdAt' in schema.paths && 'updatedAt' in schema.paths) {
      jsonSchema.properties.createdAt = { bsonType: 'date' };
      jsonSchema.properties.updatedAt = { bsonType: 'date' };
    }
    return JSON.stringify(jsonSchema, null, 2);
  } catch (error) {
    logger.error(`Failed to load schema for model ${name}`, { error });
    return undefined;
  }
};

/**
 * Asks the user for a yes/no confirmation.
 * @param {string} question - The question to ask the user
 * @returns {Promise<boolean>} - Whether the user confirmed or not
 */
export const askUserConfirmation = async (question: string): Promise<boolean> => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
};

/**
 * Generates a new migration file based on the given model name.
 * If the model exists, it extracts its schema definition and includes it in the migration.
 * If the model does not exist, it asks the user for confirmation and generates a basic table migration.
 * @param {string} name - The name of the model to generate a migration for
 */
export const generateMigration = async (name: string): Promise<void> => {
  const timestamp = getTimestamp();
  const fileName = `${timestamp}_${name.toLowerCase()}.ts`;
  const filePath = path.join(migrationDir, fileName);
  const modelExists = checkModelExists(name);
  let content: string;
  if (modelExists) {
    logger.info(`Generating migration for existing model: ${name}`);
    const schemaDefinition = await getModelSchema(name);
    content = generateMigrationTemplate(name, timestamp, true, schemaDefinition);
  } else {
    logger.warn(`No model found for ${name} in models directory`);
    const shouldContinue = await askUserConfirmation(`No model exists for ${name}. Proceed with basic table?`);
    if (!shouldContinue) {
      logger.info('Migration generation cancelled');
      return;
    }
    logger.info(`Generating basic table migration for ${name}`);
    content = generateMigrationTemplate(name, timestamp, false);
  }
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  logger.info(`Migration created: ${filePath}`);
};

/**
 * Type definition for a migration constructor.
 * This represents a class that can be instantiated to create a migration.
 * The migration constructor must be default exported from the migration file.
 */
type MigrationConstructor = new () => Migration;

/**
 * Waits for the MongoDB connection to be ready.
 * @param {number} timeoutMs The maximum time to wait in milliseconds. Defaults to 15 seconds.
 */
export async function waitForConnection(timeoutMs: number = 15000): Promise<void> {
  const start = Date.now();
  while (mongoose.connection.readyState !== 1) {
    if (Date.now() - start > timeoutMs) throw new Error(`MongoDB connection not ready after ${timeoutMs}ms`);
    logger.info(`Waiting for MongoDB connection (state: ${mongoose.connection.readyState})`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  logger.info('MongoDB connection confirmed ready');
}

/**
 * Runs a specific migration by name.
 * If the migration has not been applied before, it will apply it.
 * If the migration has been applied before, it will not do anything.
 * @param {string} name The name of the migration to run
 */
export async function runSpecificMigration(name: string) {  
  let db: mongoose.Connection | undefined;
  try {
    logger.info('Connecting to MongoDB');
    await connectDB();
    db = mongoose.connection;
    await waitForConnection();
    logger.info('MongoDB connection established');

    const migrationFiles = await importAllMigrations();
    const migration = migrationFiles
      .map(file => {
        if (!file.default || typeof file.default !== 'function') {
          throw new Error(`Migration file ${JSON.stringify(file)} does not export a default constructor`);
        }
        return new (file.default as MigrationConstructor)();
      })
      .find(m => m.name === name);

    if (!migration) throw new Error(`Migration with name ${name} not found`);

    const status = await MigrationStatus.findOne({ version: migration.version });
    if (!status || status.status !== 'applied') {
      await migration.execute(db);
      await MigrationStatus.updateOne(
        { version: migration.version },
        { version: migration.version, status: 'applied', appliedAt: new Date() },
        { upsert: true }
      );
      logger.info(`Applied migration ${migration.version} (name: ${name})`);
      await runSeederForMigration(db, name); // Run corresponding seeder after migration
    } else {
      logger.info(`Migration ${migration.version} (name: ${name}) already applied`);
    }
  } catch (error) {
    logger.error(`Failed to apply migration with name ${name}`, { error: error instanceof Error ? error.message : String(error) });
    throw error;
  } finally {
    if (db) {
      await mongoose.disconnect();
      logger.info('MongoDB disconnected');
    }
  }
}

/**
 * Imports all migration files from the migration directory.
 * Only files that match the pattern "YYYYMMDDHHMM_name.ts" are considered migrations.
 * 
 * @returns {Promise<{ default: unknown }[]>} - A promise that resolves to an array of imported migration modules.
 */
export async function importAllMigrations(): Promise<{ default: unknown }[]> {
  logger.info('Reading migration directory', { migrationDir });
  const files = fs.readdirSync(migrationDir);
  const migrationFiles = files.filter(file => /^\d{12}_.*\.ts$/.test(file));
  logger.info('Found migration files', { files: migrationFiles });
  return Promise.all(migrationFiles.map(file => import(path.join(migrationDir, file))));
}

/**
 * Runs a seeder corresponding to a migration, if it exists.
 * @param {mongoose.Connection} db The database connection
 * @param {string} name The name of the migration
 */
export async function runSeederForMigration(db: mongoose.Connection, name: string): Promise<void> {
  try {
    logger.info(`Attempting to seed for migration`, { name });
    await runSeeders(db, [`${name}-data`]);
    logger.info(`Seeder executed successfully`, { name });
  } catch (error) {
    logger.warn(`Seeder not found or failed`, { name, error: error instanceof Error ? error.message : String(error) });
  }
}

/**
 * Executes the migration command line interface.
 * 
 * @param {boolean} [exitProcess=true] - Whether to exit the process after execution.
 * 
 * @example
 * node src/utils/migration-cli.ts up
 * node src/utils/migration-cli.ts down <name>
 * node src/utils/migration-cli.ts migrate <name>
 * node src/utils/migration-cli.ts generate <name>
 * node src/utils/migration-cli.ts seed <name>
 */
export async function execute(exitProcess = true) {
  const args = process.argv.slice(2);
  const command = args[0];
  const arg1 = args[1];

  try {
    if (command === 'up') {
      await runMigrations();
    } else if (command === 'down') {
      if (!arg1) {
        logger.error('Down command requires a name');
        if (exitProcess) process.exit(1);
        return;
      }
      await rollbackMigration(arg1);
    } else if (command === 'migrate' && arg1) {
      await runSpecificMigration(arg1);
    } else if (command === 'generate') {
      if (!arg1) {
        logger.error('Generate command requires a name');
        if (exitProcess) process.exit(1);
        return;
      }
      await generateMigration(arg1);
    } else if (command === 'seed') {
      if (!arg1) {
        logger.error('Seed command requires a name');
        if (exitProcess) process.exit(1);
        return;
      }
      await connectDB();
      await runSeeders(mongoose.connection, [arg1]);
      await mongoose.disconnect();
    } else {
      logger.info('Usage: npm run migration <up|down|migrate|generate|seed> [arg]');
      logger.info('  up           : Run all pending migrations');
      logger.info('  down <name>  : Roll back by name');
      logger.info('  migrate <name> : Apply a specific migration by name (with seeding)');
      logger.info('  generate <name> : Create a new migration file');
      logger.info('  seed <name>  : Run a specific seeder');
      if (exitProcess) process.exit(1);
    }
  } catch (error) {
    logger.error('Command failed', { error: error instanceof Error ? error.message : String(error) });
    if (exitProcess) process.exit(1);
  }
}

if (require.main === module) {
  execute();
}