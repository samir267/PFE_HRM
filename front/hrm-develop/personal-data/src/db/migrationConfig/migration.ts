import mongoose from 'mongoose'
import logger from '../../configs/logger.config'

export abstract class Migration {
  abstract version: string
  abstract name: string // Added name as an abstract property

  abstract up(db: mongoose.Connection): Promise<void>
  abstract down(db: mongoose.Connection): Promise<void>

  /**
   * Execute the migration.
   * This will call the up method and log the results.
   * If an error occurs, it will be logged and re-thrown.
   * @param db The MongoDB connection to use.
   */
  async execute(db: mongoose.Connection): Promise<void> {
    try {
      logger.info(`Running migration ${this.version}`, { migration: this.version })
      await this.up(db)
      logger.info(`Migration ${this.version} completed successfully`, { migration: this.version })
    } catch (error) {
      logger.error(`Migration ${this.version} failed`, {
        migration: this.version,
        error: error instanceof Error ? error.message : String(error),
      })
      throw error
    }
  }

  /**
   * Roll back the migration.
   * This will call the down method and log the results.
   * If an error occurs, it will be logged and re-thrown.
   * @param db The MongoDB connection to use.
   */
  async rollback(db: mongoose.Connection): Promise<void> {
    try {
      logger.info(`Rolling back migration ${this.version}`, { migration: this.version })
      await this.down(db)
      logger.info(`Rollback ${this.version} completed successfully`, { migration: this.version })
    } catch (error) {
      logger.error(`Rollback ${this.version} failed`, {
        migration: this.version,
        error: error instanceof Error ? error.message : String(error),
      })
      throw error
    }
  }
}
