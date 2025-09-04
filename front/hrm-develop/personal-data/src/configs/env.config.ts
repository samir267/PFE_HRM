import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import nodeVault from 'node-vault';
import { decrypt } from '../utils/secrets.utils';

const environment = process.env.NODE_ENV || 'dev';
const envFilePath = path.resolve(process.cwd(), `./.env.${environment}`);
dotenv.config({ path: envFilePath });
dotenv.config();

const vault = nodeVault({
  endpoint: process.env.VAULT_ENDPOINT || '',
  token: process.env.VAULT_TOKEN || '',
});

async function getSecret(key: string) {
  try {
    const result = await vault.read('secret/data/myapp');
    return result.data.data[key];
  } catch (error) {
    console.error('Vault read error:', error);
    throw error;
  }
}

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'production', 'test').default('dev'),
  PORT: Joi.number().default(4000),
  USE_VAULT: Joi.boolean().default(false),
  VAULT_ENDPOINT: Joi.string().when('USE_VAULT', { is: true, then: Joi.required() }),
  VAULT_TOKEN: Joi.string().when('USE_VAULT', { is: true, then: Joi.required() }),
  ENCRYPTION_KEY: Joi.string().when('USE_VAULT', { is: true, then: Joi.required() }),
  DATABASE_BASE_URL: Joi.string().uri().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  CORS_ORIGIN: Joi.string().default('*'),
  CORS_METHODS: Joi.string().default('GET,POST,PUT,DELETE'),
  RUN_MIGRATIONS_ON_STARTUP: Joi.boolean().default(false),
  SEED_ON_STARTUP: Joi.boolean().default(false),
}).unknown(true);

async function loadConfig() {
  const useVault = process.env.USE_VAULT === 'true';
  const envVars = { ...process.env };

  if (useVault) {
    envVars.DATABASE_BASE_URL = await getSecret('db_url');
    envVars.DB_NAME = await getSecret('db_name');
    envVars.DB_USER = await getSecret('db_user');
    envVars.DB_PASSWORD = await decrypt(await getSecret('db_password_encrypted'));
    envVars.JWT_SECRET = await decrypt(await getSecret('jwt_secret_encrypted'));
  }

  // Parse feature flags
  const featureFlags: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(envVars)) {
    if (key.startsWith('FF_')) {
      const flagName = key.slice(3).toLowerCase();
      featureFlags[flagName] = value === 'true';
    }
  }
  if (useVault) {
    try {
      const vaultFlags = await getSecret('feature_flags');
      if (vaultFlags) {
        for (const [flagName, enabled] of Object.entries(vaultFlags)) {
          featureFlags[flagName.toLowerCase()] = enabled === true || enabled === 'true';
        }
      }
    } catch (error) {
      console.warn('Failed to load feature flags from Vault:', error);
    }
  }

  const { error, value } = envSchema.validate(envVars, { abortEarly: false });
  if (error) {
    console.error('Configuration Error: ', error.details);
    process.exit(1);
  }

  return {
    env: value.NODE_ENV,
    port: value.PORT,
    database: {
      dbUrl: value.DATABASE_BASE_URL,
      dbName: value.DB_NAME,
      username: value.DB_USER,
      password: value.DB_PASSWORD,
    },
    jwt: {
      secret: value.JWT_SECRET,
      expiresIn: value.JWT_EXPIRES_IN,
    },
    cors: {
      origin: value.CORS_ORIGIN,
      methods: value.CORS_METHODS,
    },
    lockTimeoutMs: parseInt(process.env.LOCK_TIMEOUT_MS || '', 10) || undefined,
    seedOnStartup: value.SEED_ON_STARTUP,
    runMigrationsOnStartup: value.RUN_MIGRATIONS_ON_STARTUP,
    featureFlags,
    getAll: function () {
      return {
        env: this.env,
        port: this.port,
        database: { ...this.database },
        jwt: { ...this.jwt },
        cors: { ...this.cors },
        featureFlags: { ...this.featureFlags },
        seedOnStartup: this.seedOnStartup,
        runMigrationsOnStartup: this.runMigrationsOnStartup,
      };
    },
  };
}

export default loadConfig();