import { startApp } from './app'
import loadConfig from './configs/env.config' // Now a promise
import connectDB from './configs/db.config'
import logger from './configs/logger.config'

// Load config asynchronously
const startServer = async () => {
  try {
    const envConfig = await loadConfig // Await the promise
    const PORT = envConfig.port !== null && envConfig.port !== undefined ? envConfig.port : 4000

    await connectDB()

    const currentPort = PORT
    const app = await startApp(envConfig)

    app.listen(currentPort, () => {
      logger.info('start server')
      logger.info(
        ` 🚀 Server ready at: http://localhost:${currentPort} ⭐️ Welcome to Pithos Global Technology server`
      )
    })
  } catch (error) {
    logger.error('🚨 Failed to start server:', error)
    process.exit(1)
  }
}

// Exécuter seulement si ce fichier est appelé directement
if (require.main === module) {
  startServer()
}

export default startServer
