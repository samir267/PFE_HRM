import { vaultConfig } from '../../../src/configs/vault.config'

// Mock vault client and decrypt
jest.mock('node-vault', () => {
  return jest.fn().mockImplementation(() => ({
    read: jest.fn().mockResolvedValue({
      data: {
        data: {
          db_url: 'test-db-url',
          db_name: 'test-db-name',
          db_user: 'test-db-user',
          db_password_encrypted: 'encrypted-password',
          jwt_secret_encrypted: 'encrypted-jwt',
        },
      },
    }),
  }))
})

jest.mock('../../../src/utils/secrets.utils', () => ({
  decrypt: jest.fn((value) => {
    if (value === 'encrypted-password') return 'decrypted-password'
    if (value === 'encrypted-jwt') return 'decrypted-jwt'
    return 'decrypted-value'
  }),
}))

describe('vaultConfig', () => {
  it('should return db_url', async () => {
    const url = await vaultConfig.getDbUrl()
    expect(url).toBe('test-db-url')
  })

  it('should return db_name', async () => {
    const name = await vaultConfig.getDbName()
    expect(name).toBe('test-db-name')
  })

  it('should return db_user', async () => {
    const user = await vaultConfig.getDbUser()
    expect(user).toBe('test-db-user')
  })

  it('should decrypt and return db_password', async () => {
    const password = await vaultConfig.getDbPassword()
    expect(password).toBe('decrypted-password')
  })

  it('should decrypt and return jwt_secret', async () => {
    const secret = await vaultConfig.getJwtSecret()
    expect(secret).toBe('decrypted-jwt')
  })
})
