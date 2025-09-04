import { Kafka, KafkaConfig, Producer, Consumer, EachMessagePayload, SASLOptions } from 'kafkajs'
import logger from '../configs/logger.config'
// Import logger from your project structure - adjust path as needed
// import { logger } from '../configs/logger.config'

export class KafkaConnector {
  private kafka: Kafka
  private producer: Producer | null = null
  private consumers: Map<string, Consumer> = new Map()
  private static instance: KafkaConnector | null = null

  // Singleton pattern to prevent multiple instances
  public static getInstance(): KafkaConnector {
    if (!KafkaConnector.instance) {
      KafkaConnector.instance = new KafkaConnector()
    }
    return KafkaConnector.instance
  }

  constructor() {
    const kafkaOptions: KafkaConfig = {
      clientId: 'my-app',
      brokers: ['localhost:9092'], // Ensure this is correct for your setup
      ssl: false, // Set to true if using SSL
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    }

    // Add SASL authentication if needed
    /* 
    if (process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD) {
      kafkaOptions.sasl = {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
      } as SASLOptions
    }
    */

    this.kafka = new Kafka(kafkaOptions)
  }

  async connect(): Promise<void> {
    // Skip Kafka connection in test environment
    if (process.env.NODE_ENV === 'test') {
      logger.info('Skipping Kafka connection in test environment')
      return
    }

    this.producer = this.kafka.producer()
    let retries = 5
    while (retries > 0) {
      try {
        await this.producer.connect()
        logger.info('✅ Connecté à Kafka')
        break
      } catch (error) {
        logger.error(`❌ Erreur de connexion (tentative ${6 - retries}/5):`, error)
        retries--
        if (retries === 0) {
          logger.error('❌ Échec de la connexion après plusieurs tentatives')
        } else {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, 5000))
        }
      }
    }
  }

  async disconnect(): Promise<void> {
    // Skip disconnection in test environment
    if (process.env.NODE_ENV === 'test') {
      return
    }

    try {
      if (this.producer) {
        await this.producer.disconnect()
        logger.info('🛑 Producteur déconnecté')
      }

      // Disconnect all consumers
      for (const [key, consumer] of this.consumers.entries()) {
        await consumer.disconnect()
        logger.info(`🛑 Consumer ${key} déconnecté`)
      }
      this.consumers.clear()
      logger.info('🛑 Tous les consommateurs déconnectés')
    } catch (error) {
      logger.error('❌ Erreur lors de la déconnexion de Kafka:', error)
    }
  }

  async produce(topic: string, message: object): Promise<void> {
    // No-op in test environment
    if (process.env.NODE_ENV === 'test') {
      logger.info(`[TEST] Message simulé envoyé à ${topic}: ${JSON.stringify(message)}`)
      return
    }

    if (!this.producer) {
      logger.error('❌ Producteur non connecté')
      throw new Error('❌ Producteur non connecté')
    }

    try {
      const formattedMessage = JSON.stringify(message)
      await this.producer.send({
        topic,
        messages: [
          {
            key: 'sample-key', // Consider making this dynamic
            value: formattedMessage,
            headers: {
              source: 'kafka-connector',
              contentType: 'application/json',
              timestamp: new Date().toISOString(),
            },
          },
        ],
      })
      logger.info(`📤 Message envoyé au topic ${topic}: ${formattedMessage}`)
    } catch (error) {
      logger.error(`❌ Erreur lors de l'envoi du message au topic ${topic}:`, error)
      // You might want to implement retry logic here or handle the error differently
    }
  }

  async consume(topic: string, callback: (message: object) => Promise<void>): Promise<void> {
    // No-op in test environment
    if (process.env.NODE_ENV === 'test') {
      logger.info(`[TEST] Consumer simulé pour ${topic}`)
      return
    }

    const groupId = 'notification-group'
    const consumerKey = `${groupId}-${topic}`

    // Check if consumer already exists for this topic and group
    if (this.consumers.has(consumerKey)) {
      logger.warn(`⚠️ Consumer déjà actif sur "${topic}"`)
      return
    }

    const consumer = this.kafka.consumer({
      groupId,
      maxBytesPerPartition: 1048576, // 1MB, adjust as needed
      sessionTimeout: 30000, // 30s, adjust as needed
      heartbeatInterval: 3000, // 3s, adjust as needed
    })

    try {
      await consumer.connect()
      logger.info(`✅ Consumer Kafka connecté pour le topic ${topic}`)
      await consumer.subscribe({ topic, fromBeginning: true })

      await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, message, heartbeat }) => {
          try {
            if (!message.value) {
              logger.warn(`⚠️ Message vide reçu sur "${topic}"`)
              return
            }

            const parsedMessage = JSON.parse(message.value.toString())
            logger.info(`📩 Message reçu du topic ${topic}: ${JSON.stringify(parsedMessage)}`)

            if (message.headers) {
              logger.info(`🔎 Headers reçus: ${JSON.stringify(message.headers, null, 2)}`)
            }

            await callback(parsedMessage)
            await heartbeat()
          } catch (error) {
            logger.error(`❌ Erreur de traitement du message sur "${topic}":`, error)
          }
        },
      })

      this.consumers.set(consumerKey, consumer)
      logger.info(`✅ Consumer démarré sur "${topic}"`)
    } catch (error) {
      logger.error(`❌ Erreur lors de la configuration du consumer sur "${topic}":`, error)
      // Implement reconnection strategy
      setTimeout(() => this.consume(topic, callback), 5000)
    }
  }

  // Helper method to get the status of the Kafka connection
  getStatus(): { isProducerConnected: boolean; activeConsumers: string[] } {
    return {
      isProducerConnected: !!this.producer,
      activeConsumers: Array.from(this.consumers.keys()),
    }
  }
}
