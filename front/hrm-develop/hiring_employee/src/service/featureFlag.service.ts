import logger from '../configs/logger.config'
import envConfig from '../configs/env.config'
import { FeatureFlag } from '../models/featureFlag.model'
import { IFeatureFlag } from '../types/featureFlag.type'
import { FlagMetrics } from '../types/flag.metrics.type'

export class FeatureFlagService {
  private flags: Map<string, IFeatureFlag> = new Map()
  private metrics: Map<string, FlagMetrics> = new Map()
  private useDatabase: boolean = false

  constructor() {
    // Defer async initialization to initialize()
    this.loadFromEnv()
  }

  private async loadFromEnv(): Promise<void> {
    const config = await envConfig
    this.useDatabase = !!config.database?.dbUrl // Moved here
    for (const [name, enabled] of Object.entries(config.featureFlags || {})) {
      this.flags.set(name, { name, enabled: !!enabled, targeting: null }) // Ensure boolean
      logger.info(`Loaded flag ${name}: ${enabled}`)
    }
  }

  async initialize(): Promise<void> {
    await this.loadFromEnv() // Ensure envConfig is loaded
    if (!this.useDatabase) return
    const dbFlags = await FeatureFlag.find()
    for (const flag of dbFlags) {
      this.flags.set(flag.name, {
        name: flag.name,
        enabled: flag.enabled,
        targeting: flag.targeting,
      })
    }
    logger.info(`Loaded ${dbFlags.length} flags from database`)
  }

  async getFlag(name: string, userId?: string, tenantId?: string): Promise<boolean> {
    this.updateMetrics(name)
    let flag = this.flags.get(name)

    if (!flag && this.useDatabase) {
      const dbFlag = await FeatureFlag.findOne({ name })
      if (dbFlag) {
        flag = { name: dbFlag.name, enabled: dbFlag.enabled, targeting: dbFlag.targeting }
        this.flags.set(name, flag)
      }
    }

    if (!flag) {
      logger.warn(`Flag ${name} not found`)
      return false
    }

    if (!flag.enabled) return false

    if (flag.targeting) {
      if (flag.targeting.users?.length && userId && !flag.targeting.users.includes(userId)) {
        return false
      }
      if (
        flag.targeting.tenants?.length &&
        tenantId &&
        !flag.targeting.tenants.includes(tenantId)
      ) {
        return false
      }
      if (flag.targeting.percentage !== undefined) {
        const hash = this.hashUser(userId || tenantId || 'default')
        return hash % 100 < flag.targeting.percentage
      }
    }

    return true
  }

  async setFlag(flag: IFeatureFlag): Promise<void> {
    this.flags.set(flag.name, flag)
    if (this.useDatabase) {
      await FeatureFlag.findOneAndUpdate(
        { name: flag.name },
        { enabled: flag.enabled, targeting: flag.targeting },
        { upsert: true }
      )
    }
    logger.info(`Set flag ${flag.name}: ${flag.enabled}`)
  }

  async getAllFlags(): Promise<IFeatureFlag[]> {
    if (this.useDatabase) {
      const dbFlags = await FeatureFlag.find()
      return dbFlags.map((f) => ({
        name: f.name,
        enabled: f.enabled,
        targeting: f.targeting,
      }))
    }
    return Array.from(this.flags.values())
  }

  private hashUser(input: string): number {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i)
      hash |= 0
    }
    return Math.abs(hash)
  }

  private updateMetrics(flagName: string): void {
    const metric = this.metrics.get(flagName) || {
      flagName,
      checks: 0,
      lastChecked: new Date(),
    }
    metric.checks += 1
    metric.lastChecked = new Date()
    this.metrics.set(flagName, metric)
  }

  getMetrics(): FlagMetrics[] {
    return Array.from(this.metrics.values())
  }
}

export const featureFlagService = new FeatureFlagService()
