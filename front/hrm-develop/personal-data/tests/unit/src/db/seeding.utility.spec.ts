/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SeedDataFactory, loadSeeders, runSeeders } from '../../../../src/utils/db/seeding.utility';
import { Seeder } from '../../../../src/types/Seeder';

// Mock 'path' comprehensively
jest.mock('path', () => {
  const originalPath = jest.requireActual('path');
  return {
    ...originalPath,
    isAbsolute: jest.fn((path) => typeof path === 'string' && (path.startsWith('/') || path.startsWith('\\'))),
    join: jest.fn((...args) => originalPath.posix.join(...args)),
    resolve: jest.fn((...args) => originalPath.posix.resolve(...args)),
    dirname: jest.fn((path) => originalPath.posix.dirname(path)),
    basename: jest.fn((path) => originalPath.posix.basename(path)),
  };
});

// Mock 'fs' to simulate the seeders directory
jest.mock('fs', () => {
  const originalFs = jest.requireActual('fs');
  return {
    ...originalFs,
    readdirSync: jest.fn(() => ['dev-users.ts']),
    statSync: jest.fn((path) => ({
      isDirectory: () => true,
      isFile: () => false,
    })),
  };
});

// Mock dynamic import behavior in loadSeeders
jest.mock('module', () => {
  const originalModule = jest.requireActual('module');
  return {
    ...originalModule,
    createRequire: jest.fn(() => ({
      resolve: jest.fn((modulePath) => {
        if (modulePath.includes('dev-users')) {
          return require.resolve('../../../../src/db/seeders/dev-users');
        }
        return require.resolve(modulePath);
      }),
    })),
  };
});

describe('seeding.utility', () => {
  let mongod: MongoMemoryServer;
  let connection: mongoose.Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    connection = mongoose.connection;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
    jest.clearAllMocks();
  });

  describe('SeedDataFactory', () => {
    it('should generate a user with valid properties', () => {
      const user = SeedDataFactory.generateUser('test', 1);
      expect(user.email).toMatch(/^test1@/);
      expect(user.firstName).toBeDefined();
      expect(user.lastName).toBeDefined();
      expect(user.phone).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('loadSeeders', () => {
    it('should load seeders from the seeds directory', async () => {
      const seeders = await loadSeeders();
      expect(seeders.length).toBe(1);
      expect(seeders[0].name).toBe('dev-users');
    });
  });

  describe('runSeeders', () => {
    it('should run the dev-users seeder and insert data', async () => {
      await runSeeders(connection, ['dev-users'], 'dev');
      const users = await connection.collection('users').find({}).toArray();

      expect(users.length).toBe(5);
      
      // Check that each user's email follows the expected pattern
      users.forEach((user, index) => {
        expect(user.email).toMatch(new RegExp(`^dev${index + 1}@`));
        expect(user.firstName).toBeDefined();
        expect(user.lastName).toBeDefined();
        expect(user.phone).toBeDefined();
      });
    });

    it('should skip seeding if no matching seeders', async () => {
      await runSeeders(connection, ['unknown-seeder'], 'dev');
      const users = await connection.collection('users').find({}).toArray();
      expect(users.length).toBe(0);
    });
  });
});