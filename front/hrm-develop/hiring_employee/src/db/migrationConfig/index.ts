import mongoose from 'mongoose'
import path from 'path'
import config from '../../configs/migrate-mongo.config'
import logger from '../../configs/logger.config'
import MigrationStatus from '../models/MigrationStatus'
import { Migration } from './migration'
import connectDB from '../../configs/db.config'
import { acquireLock, releaseLock } from './lock'

type MigrationConstructor = new () => Migration

/**
 * Executes all pending migrations.
 * If `force` is true, it will also re-execute migrations that have already been applied.
 * @param {boolean} [force=false] - Whether to re-execute already applied migrations.
 */
export async function runMigrations(force: boolean = false): Promise<void> {
  let db: mongoose.Connection | undefined
  try {
    logger.info('Attempting to run migrations', { force })
    await connectDB()
    db = mongoose.connection
    await acquireLock()
    logger.info('Starting database migrations')

    const migrationFiles = await importAllMigrations()
    const migrations = migrationFiles.map((file, index) => {
      logger.info('Processing migration file', {
        index,
        defaultExport: file.default?.name,
        type: typeof file.default,
      })
      if (!file.default || typeof file.default !== 'function') {
        throw new Error(
          `Migration file ${JSON.stringify(file)} does not export a default constructor`
        )
      }
      return new (file.default as MigrationConstructor)()
    })

    // Iterate over migrations and check if they have already been applied.
    for (const migration of migrations) {
      const status = await MigrationStatus.findOne({ version: migration.version })
      if (!status || status.status !== 'applied' || force) {
        // If the migration has not been applied or has been applied but force is true, apply it.
        logger.info('Applying migration', { version: migration.version })
        await migration.execute(db)
        await MigrationStatus.updateOne(
          { version: migration.version },
          { version: migration.version, status: 'applied', appliedAt: new Date() },
          { upsert: true }
        )
      } else {
        logger.info('Migration already applied', { version: migration.version })
      }
    }
    logger.info('All migrations completed successfully')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logger.error('Migration process failed', { error: errorMessage })
    throw error
  } finally {
    await releaseLock()
  }
}

/**
 * Rolls back a specific migration by name.
 * If no name is provided, it rolls back the latest migration.
 * Updates the migration status to 'rolled_back' if successful.
 *
 * @param {string} [name] - The name of the migration to roll back.
 * @throws Will throw an error if the migration file is invalid or the rollback process fails.
 */
export async function rollbackMigration(name?: string): Promise<void> {
  let db: mongoose.Connection | undefined
  try {
    logger.info('Starting migration rollback')
    await connectDB()
    db = mongoose.connection
    await acquireLock()

    // Import all migration files
    const migrationFiles = await importAllMigrations()
    const migrations = migrationFiles.map((file, index) => {
      logger.info('Processing migration file', {
        index,
        defaultExport: file.default?.name,
        type: typeof file.default,
      })
      if (!file.default || typeof file.default !== 'function') {
        throw new Error(
          `Migration file ${JSON.stringify(file)} does not export a default constructor`
        )
      }
      return new (file.default as MigrationConstructor)()
    })

    // Determine the target migration
    const targetMigration = name
      ? migrations.find((m) => m.name === name) // Match by name if provided
      : migrations[migrations.length - 1] // Default to the latest migration

    // Throw an error if the target migration is not found
    if (!targetMigration) {
      throw new Error(`Migration with name ${name} not found`)
    }

    // Check the status of the migration
    const status = await MigrationStatus.findOne({ version: targetMigration.version })
    if (status && status.status === 'applied') {
      // Rollback the migration if it was applied
      await targetMigration.rollback(db)
      await MigrationStatus.updateOne(
        { version: targetMigration.version },
        { status: 'rolled_back' }
      )
      logger.info(
        `Rollback completed for migration ${targetMigration.version} (name: ${targetMigration.name})`
      )
    } else {
      logger.info(
        `Migration ${targetMigration.version} (name: ${targetMigration.name}) not applied or already rolled back`
      )
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logger.error('Rollback process failed', { error: errorMessage })
    throw error
  } finally {
    await releaseLock()
    if (db) {
      await mongoose.disconnect()
      logger.info('MongoDB disconnected')
    }
  }
}

/**
 * Imports all migration files from the migrations directory.
 * Only files that match the pattern "YYYYMMDDHHMM_name.ts" are considered migrations.
 * @returns {Promise<{ default: MigrationConstructor }[]>} - A promise that resolves to an array of imported migration modules.
 */
export async function importAllMigrations(): Promise<{ default: MigrationConstructor }[]> {
  const migrationDir = config.migrationsDir
  logger.info('Reading migration directory', { migrationDir })
  const files = await import('fs').then((fs) => fs.readdirSync(migrationDir))
  logger.info('Found migration files', { files })

  const migrationFiles = files
    .filter(
      (file) =>
        file.match(/^\d{12}_.*\.ts$/) && // Match the migration file pattern
        !file.startsWith('index') && // Exclude the index file
        !file.startsWith('migration') // Exclude the migration file
    )
    .map((file) => {
      const fullPath = path.resolve(migrationDir, file)
      logger.info('Importing migration', { fullPath })
      return import(fullPath)
    })

  return Promise.all(migrationFiles)
}
