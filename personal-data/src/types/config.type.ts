interface DatabaseConfig {
  dbUrl: string
  dbName: string
  username: string
  password: string
}

interface JwtConfig {
  secret: string
  expiresIn: string
}

interface CorsConfig {
  origin: string
  methods: string
}

export interface AppConfig {
  env: string
  port: number
  database: DatabaseConfig
  jwt: JwtConfig
  cors: CorsConfig
  lockTimeoutMs?: number
  seedOnStartup: boolean
  runMigrationsOnStartup: boolean
  getAll: () => {
    env: string
    port: number
    database: DatabaseConfig
    jwt: JwtConfig
    cors: CorsConfig
    seedOnStartup: boolean
    featureFlags: Record<string, boolean>
    runMigrationsOnStartup: boolean
  }
}
