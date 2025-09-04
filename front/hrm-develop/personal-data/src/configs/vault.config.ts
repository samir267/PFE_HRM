import nodeVault from 'node-vault'
import { decrypt } from '../utils/secrets.utils'
import logger from '../utils/logger'

const vault = nodeVault({
  endpoint: process.env.VAULT_ENDPOINT || 'http://localhost:8200',
  token: process.env.VAULT_TOKEN || 'root',
})

async function getSecret(key: string) {
  try {
    const result = await vault.read('secret/data/myapp') // Fixed: removed extra "secrets/"
    logger.info('Vault response:', result.data.data)
    return result.data.data[key]
  } catch (error) {
    logger.error('Vault read error:', error)
    throw error
  }
}

export const vaultConfig = {
  getDbUrl: async () => getSecret('db_url'),
  getDbName: async () => getSecret('db_name'),
  getDbUser: async () => getSecret('db_user'),
  getDbPassword: async () => decrypt(await getSecret('db_password_encrypted')),
  getJwtSecret: async () => decrypt(await getSecret('jwt_secret_encrypted')),
}
