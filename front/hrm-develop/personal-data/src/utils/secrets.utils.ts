import * as crypto from 'crypto'

function getKey() {
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex')
  if (!key.length) throw new Error('ENCRYPTION_KEY missing')
  return key
}

export function encrypt(text: string): string {
  const key = getKey()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

export function decrypt(encrypted: string): string {
  const key = getKey()
  const [ivHex, text] = encrypted.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(text, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
