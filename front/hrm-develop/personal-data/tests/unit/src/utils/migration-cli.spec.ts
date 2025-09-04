/* eslint-disable prettier/prettier */
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { 
  getTimestamp, 
  generateMigrationTemplate, 
  checkModelExists, 
  askUserConfirmation, 
  generateMigration
} from '../../../../src/utils/migration-cli';

// Mock dependencies
jest.mock('fs', () => ({
  readdirSync: jest.fn().mockReturnValue([]),
  writeFileSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(false),
  mkdirSync: jest.fn(),
  createWriteStream: jest.fn(() => ({
    write: jest.fn(),
    end: jest.fn(),
    on: jest.fn().mockReturnThis()
  }))
}));

jest.mock('path', () => ({
  join: jest.fn(),
  dirname: jest.fn().mockReturnValue('/mocked'),
  basename: jest.fn().mockReturnValue('mocked-file')
}));

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(undefined),
  disconnect: jest.fn().mockResolvedValue(undefined),
  Schema: jest.fn((schema) => ({ obj: schema })),
  model: jest.fn(() => ({})),
  Types: { ObjectId: jest.fn() },
  connection: {
    readyState: 1,
    createCollection: jest.fn().mockResolvedValue(undefined),
    collection: jest.fn().mockReturnValue({
      drop: jest.fn().mockResolvedValue(undefined),
      deleteMany: jest.fn().mockResolvedValue({}),
      insertMany: jest.fn().mockResolvedValue({})
    })
  }
}));

jest.mock('../../../../src/db/migrationConfig', () => ({
  runMigrations: jest.fn().mockResolvedValue(undefined),
  rollbackMigration: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('../../../../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
}));

jest.mock('../../../../src/configs/db.config', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('../../../../src/db/models/MigrationStatus', () => ({
  findOne: jest.fn().mockResolvedValue(null),
  updateOne: jest.fn().mockResolvedValue({})
}));

jest.mock('readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn(),
    close: jest.fn()
  }))
}));

describe('Migration Utilities - Minimal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.writeFileSync as jest.Mock).mockImplementation(() => undefined);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => undefined);
    // Adjust path.join to return a simplified path matching the expectation
    (path.join as jest.Mock).mockImplementation((...args) => {
      if (args.includes('../models')) {
        return `src/models/${args[args.length - 1]}`;
      }
      if (args.includes('../db/migrations')) {
        return `src/db/migrations/${args[args.length - 1]}`;
      }
      return args.join('/');
    });
    (path.dirname as jest.Mock).mockReturnValue('/mocked');
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: jest.fn((_, cb) => cb('y')),
      close: jest.fn()
    });
  });

  describe('getTimestamp', () => {
    it('should generate a timestamp in the correct format', () => {
      const mockDate = new Date('2025-03-23T12:30:00Z');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
      const timestamp = getTimestamp();
      expect(timestamp).toEqual('202503231230');
    });
  });

  describe('generateMigrationTemplate', () => {
    it('should generate a basic template when no model exists', () => {
      const template = generateMigrationTemplate('user', '202503231230', false);
      expect(template).toContain('class UserMigration extends Migration');
      expect(template).toContain('version = \'202503231230_user\'');
      expect(template).toContain('await db.createCollection(\'user\')');
    });
  });



  describe('askUserConfirmation', () => {
    it('should return true for yes responses', async () => {
      const result = await askUserConfirmation('Continue?');
      expect(result).toBe(true);
    });

    it('should return false for no responses', async () => {
      (readline.createInterface as jest.Mock).mockReturnValueOnce({
        question: jest.fn((_, cb) => cb('n')),
        close: jest.fn()
      });
      const result = await askUserConfirmation('Continue?');
      expect(result).toBe(false);
    });
  });

  describe('generateMigration', () => {
    it('should generate migration file for existing model', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      jest.mock('../../../../src/models/user.model', () => ({
        User: { schema: { obj: { name: { type: String } } } }
      }), { virtual: true });
      await generateMigration('user');
      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('should not write file if user declines', async () => {
      (readline.createInterface as jest.Mock).mockReturnValueOnce({
        question: jest.fn((_, cb) => cb('n')),
        close: jest.fn()
      });
      await generateMigration('user');
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });
});