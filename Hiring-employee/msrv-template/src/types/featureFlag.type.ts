export interface FlagTargeting {
  users?: string[]
  tenants?: string[]
  percentage?: number
}

export interface IFeatureFlag {
  name: string
  enabled: boolean
  targeting?: FlagTargeting | null
}
