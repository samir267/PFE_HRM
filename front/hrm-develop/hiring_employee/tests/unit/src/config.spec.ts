import dotenv from 'dotenv'
import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Nous allons utiliser dynamic import pour charger dynamiquement la configuration
// au lieu d'utiliser require

describe('Configuration système', () => {
  const originalEnv = process.env

  // Charger les variables d'environnement avant chaque test
  beforeEach(() => {
    jest.resetModules() // Réinitialiser les modules pour éviter le cache
    process.env = { ...originalEnv }
    dotenv.config() // Charger .env avant chaque test
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('charge correctement la configuration', async () => {
    // Utilisation de l'import dynamique au lieu de require
    const { default: envConfig } = await import('../../../src/configs/env.config')
    const config = await envConfig // Ajouter await ici

    expect(config.database.dbUrl).toBe('mongodb://localhost:27017/')
    expect(config.database.dbName).toBe('test_db')
    expect(config.jwt.secret).toBe('mysecretkey')
    expect(config.cors.origin).toBe('*')
  })

  it("respecte les variables d'environnement", async () => {
    // Modifie les variables d'environnement
    process.env.DATABASE_BASE_URL = 'mongodb://localhost:27017/'
    process.env.DB_NAME = 'prod_db'

    // Réinitialiser le module pour que la configuration prenne en compte les nouvelles variables d'environnement
    const { default: freshConfig } = await import('../../../src/configs/env.config')
    const config = await freshConfig // Ajouter await ici

    // Vérifier les nouvelles valeurs
    expect(config.database.dbUrl).toBe('mongodb://localhost:27017/')
    expect(config.database.dbName).toBe('prod_db')
  })

  it('applique les valeurs par défaut quand les variables sont manquantes', async () => {
    delete process.env.CORS_ORIGIN

    const { default: freshConfig } = await import('../../../src/configs/env.config')
    const config = await freshConfig // Ajouter await ici

    expect(config.cors.origin).toBe('*')
  })

  it('peut retourner toute la configuration avec getAll', async () => {
    const { default: envConfig } = await import('../../../src/configs/env.config')
    const config = await envConfig // Ajouter await ici

    const allConfig = config.getAll()

    // Vérifier que toutes les sections sont présentes
    expect(allConfig).toHaveProperty('env')
    expect(allConfig).toHaveProperty('database')
    expect(allConfig).toHaveProperty('jwt')
    expect(allConfig).toHaveProperty('cors')

    // Vérifier quelques valeurs
    expect(allConfig.database.dbUrl).toBe('mongodb://localhost:27017/')
    expect(allConfig.jwt.secret).toBe('mysecretkey')
  })

  // Pour résoudre le problème des opérations asynchrones
  afterAll((done) => {
    setTimeout(() => {
      done()
    }, 100)
  })
})

const originalEnv = process.env

// Charger les variables d'environnement avant chaque test
beforeEach(() => {
  jest.resetModules() // Réinitialiser les modules pour éviter le cache
  process.env = { ...originalEnv }
  dotenv.config() // Charger .env avant chaque test
})

afterEach(() => {
  process.env = originalEnv
})

it('charge correctement la configuration', async () => {
  // Utilisation de l'import dynamique au lieu de require
  const { default: envConfig } = await import('../../../src/configs/env.config')
  const config = await envConfig // Ajouter await ici

  expect(config.database.dbUrl).toBe('mongodb://localhost:27017/')
  expect(config.database.dbName).toBe('test_db')
  expect(config.jwt.secret).toBe('mysecretkey')
  expect(config.cors.origin).toBe('*')
})

it("respecte les variables d'environnement", async () => {
  // Modifie les variables d'environnement
  process.env.DATABASE_BASE_URL = 'mongodb://localhost:27017/'
  process.env.DB_NAME = 'prod_db'

  // Réinitialiser le module pour que la configuration prenne en compte les nouvelles variables d'environnement
  const { default: freshConfig } = await import('../../../src/configs/env.config')
  const config = await freshConfig // Ajouter await ici

  // Vérifier les nouvelles valeurs
  expect(config.database.dbUrl).toBe('mongodb://localhost:27017/')
  expect(config.database.dbName).toBe('prod_db')
})

it('applique les valeurs par défaut quand les variables sont manquantes', async () => {
  delete process.env.CORS_ORIGIN

  const { default: freshConfig } = await import('../../../src/configs/env.config')
  const config = await freshConfig // Ajouter await ici

  expect(config.cors.origin).toBe('*')
})

it('peut retourner toute la configuration avec getAll', async () => {
  const { default: envConfig } = await import('../../../src/configs/env.config')
  const config = await envConfig // Ajouter await ici

  const allConfig = config.getAll()

  // Vérifier que toutes les sections sont présentes
  expect(allConfig).toHaveProperty('env')
  expect(allConfig).toHaveProperty('database')
  expect(allConfig).toHaveProperty('jwt')
  expect(allConfig).toHaveProperty('cors')

  // Vérifier quelques valeurs
  expect(allConfig.database.dbUrl).toBe('mongodb://localhost:27017/')
  expect(allConfig.jwt.secret).toBe('mysecretkey')
})

// Pour résoudre le problème des opérations asynchrones
afterAll((done) => {
  setTimeout(() => {
    done()
  }, 100)
})
