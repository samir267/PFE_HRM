/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import logger from '../logger';
import { Seeder } from '../../types/Seeder';
import { faker } from '@faker-js/faker';

const seedDir = path.join(__dirname, 'seeds');

export class SeedDataFactory {
  static generateUser(emailPrefix: string = 'user', index: number) {
    return {
      email: `${emailPrefix}${index}@${faker.internet.domainName()}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    };
  }

  static generateAddress() {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    };
  }

  static generateRandomString(length: number): string {
    return faker.string.alphanumeric(length);
  }

  static generateTimestamp(): string {
    return faker.date.recent().toISOString();
  }

  static generateNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }
}

export async function loadSeeders(): Promise<Seeder[]> {
  try {
    logger.info('Loading seeders', { directory: seedDir });
    const files = fs.readdirSync(seedDir).filter(file => file.endsWith('.ts') && !file.startsWith('index'));
    if (files.length === 0) {
      logger.warn('No seeder files found', { directory: seedDir });
      return [];
    }
    const seedModules = await Promise.all(
      files.map(file => {
        const filePath = path.join(seedDir, file);
        logger.debug('Loading seeder file', { filePath });
        return import(filePath);
      })
    );
    return seedModules.map(mod => new (mod.default as new () => Seeder)());
  } catch (error) {
    logger.error('Failed to load seeders', { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : String(error) 
    });
    throw error;
  }
}

export function resolveDependencies(seeders: Seeder[]): Seeder[] {
  const resolved = new Set<string>();
  const tempMark = new Set<string>();
  const ordered: Seeder[] = [];

  function visit(seeder: Seeder) {
    if (tempMark.has(seeder.name)) throw new Error(`Circular dependency detected at ${seeder.name}`);
    if (resolved.has(seeder.name)) return;
    tempMark.add(seeder.name);
    for (const depName of seeder.dependencies) {
      const dep = seeders.find(s => s.name === depName);
      if (!dep) throw new Error(`Dependency ${depName} not found for ${seeder.name}`);
      visit(dep);
    }
    tempMark.delete(seeder.name);
    resolved.add(seeder.name);
    ordered.push(seeder);
  }

  seeders.forEach(seeder => visit(seeder));
  return ordered;
}

export async function runSeeders(db: mongoose.Connection, specificSeeders?: string[], environment: string = process.env.NODE_ENV || 'dev'): Promise<void> {
  try {
    logger.info('Starting seeding process', { environment, specificSeeders });
    const allSeeders = await loadSeeders();
    const seedersToRun = specificSeeders
      ? allSeeders.filter(s => specificSeeders.includes(s.name))
      : allSeeders.filter(s => s.name.startsWith(`${environment}-`) || !s.name.includes('-'));

    if (seedersToRun.length === 0) {
      logger.info('No seeders to run', { environment, specificSeeders });
      return;
    }

    const orderedSeeders = resolveDependencies(seedersToRun);
    logger.info('Seeder execution order', { seeders: orderedSeeders.map(s => s.name) });

    for (const seeder of orderedSeeders) {
      logger.info('Running seeder', { name: seeder.name, description: seeder.description });
      await seeder.seed(db);
      logger.info('Seeder completed', { name: seeder.name });
    }

    logger.info('Seeding process completed successfully');
  } catch (error) {
    const errorDetails = error instanceof Error ? { message: error.message, stack: error.stack } : { message: String(error) };
    logger.error('Seeding process failed', errorDetails);
    throw error;
  }
}

export async function seedOnStartup(db: mongoose.Connection): Promise<void> {
  const shouldSeed = process.env.SEED_ON_STARTUP === 'true';
  logger.info('Checking startup seeding', { enabled: shouldSeed });
  if (shouldSeed) {
    await runSeeders(db);
    logger.info('Startup seeding completed');
  } else {
    logger.info('Startup seeding skipped');
  }
}