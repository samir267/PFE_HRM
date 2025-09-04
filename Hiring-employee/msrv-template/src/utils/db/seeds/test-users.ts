/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { Seeder } from '../../../types/Seeder';
import logger from '../../logger';
import { SeedDataFactory } from '../seeding.utility';
export default class TestUsersSeeder implements Seeder {
  name = 'test-users';
  dependencies = ['dev-users'];
  description = 'Seeds additional test users';

  async seed(db: mongoose.Connection): Promise<void> {
    const collection = db.collection('users');
    const testUsers = Array.from({ length: 3 }, (_, i) => SeedDataFactory.generateUser('test', i + 1));
    logger.info('Inserting test users', { count: testUsers.length });
    await collection.insertMany(testUsers);
  }
}