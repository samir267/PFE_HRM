import mongoose from 'mongoose'
import { withTransaction } from '../../../src/service/transactionManager'

describe('Transaction Middleware', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {})
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  test('should execute operations within a transaction', async () => {
    const mockOperation = jest.fn(async (session) => {
      expect(session).toBeDefined()
      return 'success'
    })

    const result = await withTransaction(mockOperation)
    expect(result).toBe('success')
    expect(mockOperation).toHaveBeenCalledTimes(1)
  }, 10000) // Augmentation du timeout si nécessaire

  test('should abort transaction on error', async () => {
    const mockOperation = jest.fn(async (session) => {
      throw new Error('Test error')
    })

    await expect(withTransaction(mockOperation)).rejects.toThrow('Test error')
  }, 10000) // Timeout ajusté
})
