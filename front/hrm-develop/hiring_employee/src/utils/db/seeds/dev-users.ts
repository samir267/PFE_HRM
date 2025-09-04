/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { Seeder } from '../../../types/Seeder';
import logger from '../../logger';
import { SeedDataFactory } from '../seeding.utility';


export default class DevUsersSeeder implements Seeder {
  name = 'dev-users';
  dependencies = [];
  description = 'Seeds initial development users';

  async seed(db: mongoose.Connection): Promise<void> {
    const collection = db.collection('users');
    logger.info('Clearing users collection for dev seeding');
    await collection.deleteMany({});
    const users = Array.from({ length: 5 }, (_, i) => SeedDataFactory.generateUser('dev', i + 1));
    logger.info('Inserting dev users', { count: users.length });
    await collection.insertMany(users);
  }
}