import mongoose, { ClientSession } from 'mongoose'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { withTransaction } from '../../../src/service/transactionManager'

// MongoDB setup
let mongoReplSet: MongoMemoryReplSet

// Test schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})
const User = mongoose.model('User', userSchema)

// Initialize before tests
beforeAll(async () => {
  mongoReplSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
  const mongoUri = mongoReplSet.getUri()
  await mongoose.connect(mongoUri)
})

// Cleanup
afterEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoReplSet.stop()
})

describe('withTransaction', () => {
  // Basic success test
  it('should commit transaction if no error occurs', async () => {
    await withTransaction(async (session: ClientSession) => {
      await User.create([{ name: 'Test User', email: 'test@example.com' }], { session })
    })

    const user = await User.findOne({ name: 'Test User' })
    expect(user).not.toBeNull()
    expect(user?.email).toBe('test@example.com')
  })

  // Rollback test
  it('should roll back transaction if an error occurs', async () => {
    const testOperation = async (session: ClientSession) => {
      await User.create([{ name: 'Failed User', email: 'fail@example.com' }], { session })
      throw new Error('Test error')
    }

    await expect(withTransaction(testOperation)).rejects.toThrow('Test error')

    const user = await User.findOne({ name: 'Failed User' })
    expect(user).toBeNull()
  })

  // Test return value
  it('should return the result of the transaction callback', async () => {
    const result = await withTransaction(async (session: ClientSession) => {
      const user = await User.create([{ name: 'Return User', email: 'return@example.com' }], {
        session,
      })
      return { success: true, userId: user[0]._id }
    })

    expect(result).toHaveProperty('success', true)
    expect(result).toHaveProperty('userId')

    const user = await User.findOne({ name: 'Return User' })
    expect(user).not.toBeNull()
  })

  // Test multiple operations in one transaction
  it('should handle multiple operations in one transaction', async () => {
    await withTransaction(async (session: ClientSession) => {
      // Adding ordered: true to fix the error
      await User.create(
        [
          { name: 'User 1', email: 'user1@example.com' },
          { name: 'User 2', email: 'user2@example.com' },
        ],
        { session, ordered: true }
      )

      // Adding ordered: true to the second create operation as well
      await User.create(
        [
          { name: 'User 3', email: 'user3@example.com' },
          { name: 'User 4', email: 'user4@example.com' },
        ],
        { session, ordered: true }
      )
    })

    const users = await User.find({})
    expect(users.length).toBe(4)
  })

  // Test session management
  it('should properly close session even when transaction succeeds', async () => {
    const mockEndSession = jest.fn()
    const mockSession = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: mockEndSession,
    }

    jest
      .spyOn(mongoose, 'startSession')
      .mockResolvedValueOnce(mockSession as unknown as ClientSession)

    await withTransaction(async (session) => {
      return 'test result'
    })

    expect(mockSession.startTransaction).toHaveBeenCalled()
    expect(mockSession.commitTransaction).toHaveBeenCalled()
    expect(mockSession.abortTransaction).not.toHaveBeenCalled()
    expect(mockEndSession).toHaveBeenCalled()
  })

  // Test session management during errors
  it('should properly close session even when transaction fails', async () => {
    const mockEndSession = jest.fn()
    const mockSession = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: mockEndSession,
    }

    jest
      .spyOn(mongoose, 'startSession')
      .mockResolvedValueOnce(mockSession as unknown as ClientSession)

    await expect(
      withTransaction(async (session) => {
        throw new Error('Test error')
      })
    ).rejects.toThrow('Test error')

    expect(mockSession.startTransaction).toHaveBeenCalled()
    expect(mockSession.commitTransaction).not.toHaveBeenCalled()
    expect(mockSession.abortTransaction).toHaveBeenCalled()
    expect(mockEndSession).toHaveBeenCalled()
  })
})
