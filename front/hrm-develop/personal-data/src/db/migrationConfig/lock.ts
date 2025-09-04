import MigrationLock from '../models/MigrationLock'
import logger from '../../configs/logger.config'
import loadConfig from '../../configs/env.config' // Now a promise

// Function to get lock timeout asynchronously
async function getLockTimeoutMs() {
  const envConfig = await loadConfig // Await the promise
  return envConfig.lockTimeoutMs || 300000 // Default to 5 minutes if not set
}

/**
 * Acquire a migration lock.
 * Throws an error if a lock is already held.
 */
export async function acquireLock(): Promise<void> {
  const LOCK_TIMEOUT_MS = await getLockTimeoutMs() // Fetch dynamically
  const existingLock = await MigrationLock.findOne()
  if (existingLock) {
    const lockAge = Date.now() - existingLock.lockedAt.getTime()
    if (lockAge < LOCK_TIMEOUT_MS) {
      throw new Error('Migrations are already running. Please try again later.')
    } else {
      // If the lock is older than the timeout, release it and acquire a new one
      await releaseLock()
    }
  }

  await MigrationLock.create({})
  logger.info('Migration lock acquired')
}

/**
 * Release the migration lock.
 */
export async function releaseLock(): Promise<void> {
  await MigrationLock.deleteMany({})
  logger.info('Migration lock released')
}
