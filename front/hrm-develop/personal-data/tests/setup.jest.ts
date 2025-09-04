// jest.setup.ts
process.env.NODE_ENV = 'test'
// Mock KafkaConnector
jest.mock('./src/service/kafkaConnector', () => {
  const mockInstance = {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    produce: jest.fn().mockResolvedValue(undefined),
    consume: jest.fn().mockResolvedValue(undefined),
    getStatus: jest.fn().mockReturnValue({
      isProducerConnected: true,
      activeConsumers: ['test-topic'],
    }),
  }

  return {
    KafkaConnector: {
      getInstance: jest.fn().mockReturnValue(mockInstance),
    },
    __esModule: true,
  }
})

// Global teardown
afterAll(async () => {
  // Reset mocks
  jest.resetAllMocks()

  // If you have any test database connections, close them
  // await mongoose.connection.close();

  // If you have any test server instances, close them
  // await server.close();

  // If you have any file system operations to clean up
  // await fs.promises.rm('./test-uploads', { recursive: true, force: true });

  // Add a small delay to ensure all resources are released
  await new Promise((resolve) => setTimeout(resolve, 500))
})
