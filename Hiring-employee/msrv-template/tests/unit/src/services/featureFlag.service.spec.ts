import mongoose from 'mongoose'
import { FeatureFlag } from '../../../../src/models/featureFlag.model'
import { FeatureFlagService } from '../../../../src/service/featureFlag.service'

jest.mock('../../../../src/configs/env.config', () => ({
  __esModule: true,
  default: Promise.resolve({
    featureFlags: {
      sample_feature: true,
      healthcheck: false,
    },
    database: {
      dbUrl: null, // Simulate useDatabase: false
    },
  }),
}))

jest.mock('../../../../src/models/featureFlag.model')

describe('FeatureFlagService', () => {
  let service: FeatureFlagService

  beforeEach(async () => {
    jest.clearAllMocks()
    service = new FeatureFlagService()
    await service.initialize() // Ensure envConfig is loaded
  })

  afterAll(async () => {
    await mongoose.disconnect() // Close MongoDB connection
  })

  describe('getMetrics', () => {
    it('should return an empty array when no metrics are recorded', () => {
      const metrics = service.getMetrics()
      expect(metrics).toEqual([])
    })

    it('should return metrics for a single flag after one check', async () => {
      // Mock FeatureFlag.findOne to return null (no DB flag)
      ;(FeatureFlag.findOne as jest.Mock).mockResolvedValue(null)

      await service.getFlag('sample_feature')

      const metrics = service.getMetrics()
      expect(metrics).toHaveLength(1)
      expect(metrics[0]).toMatchObject({
        flagName: 'sample_feature',
        checks: 1,
      })
      expect(metrics[0].lastChecked).toBeInstanceOf(Date)
      expect(metrics[0].lastChecked.getTime()).toBeLessThanOrEqual(Date.now())
    })

    it('should return metrics for multiple flags with multiple checks', async () => {
      // Mock FeatureFlag.findOne
      ;(FeatureFlag.findOne as jest.Mock).mockResolvedValue(null)

      await service.getFlag('sample_feature')
      await service.getFlag('sample_feature')
      await service.getFlag('healthcheck')

      const metrics = service.getMetrics()
      expect(metrics).toHaveLength(2)

      const sampleMetric = metrics.find((m) => m.flagName === 'sample_feature')
      expect(sampleMetric).toMatchObject({
        flagName: 'sample_feature',
        checks: 2,
      })
      expect(sampleMetric!.lastChecked).toBeInstanceOf(Date)

      const healthMetric = metrics.find((m) => m.flagName === 'healthcheck')
      expect(healthMetric).toMatchObject({
        flagName: 'healthcheck',
        checks: 1,
      })
      expect(healthMetric!.lastChecked).toBeInstanceOf(Date)
    })

    it('should update lastChecked on subsequent checks', async () => {
      // Mock FeatureFlag.findOne
      ;(FeatureFlag.findOne as jest.Mock).mockResolvedValue(null)

      await service.getFlag('sample_feature')
      const firstMetrics = service.getMetrics()
      const firstTime = firstMetrics[0].lastChecked.getTime()

      await new Promise((resolve) => setTimeout(resolve, 10))

      await service.getFlag('sample_feature')
      const secondMetrics = service.getMetrics()
      const secondTime = secondMetrics[0].lastChecked.getTime()

      expect(secondMetrics[0].checks).toBe(2)
      expect(secondTime).toBeGreaterThan(firstTime)
    })
  })
})
