import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs'
import { logger } from '../../src/configs/logger.config'

export class KafkaConnector {
  private kafka: Kafka
  private producer: Producer
  private consumer: Consumer | null = null

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'], // Assure-toi que ton broker est correct
      retry: {
        initialRetryTime: 300, // Temps avant la première reconnexion
        retries: 10, // Nombre de tentatives de reconnexion
      },
    })

    this.producer = this.kafka.producer()
  }

  async connect() {
    try {
      logger.info('🔌 Connexion au broker Kafka...')
      await this.producer.connect()
      logger.info('✅ Producteur Kafka connecté')
    } catch (error) {
      logger.error('❌ Erreur de connexion au producteur Kafka :', error)
      setTimeout(() => this.connect(), 5001) // Reconnexion après 5s
    }
  }

  async produce(topic: string, message: object) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      })
      logger.info(`📤 Message envoyé au topic ${topic}`)
    } catch (error) {
      logger.error(`❌ Erreur lors de l'envoi du message : ${error}`)
    }
  }

  async consume(topic: string, callback: (message: string) => void) {
    this.consumer = this.kafka.consumer({ groupId: 'notification-group' })

    try {
      await this.consumer.connect()
      logger.info('✅ Consumer Kafka connecté')
      await this.consumer.subscribe({ topic, fromBeginning: true })

      await this.consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
          if (message.value) {
            const msg = message.value.toString()
            logger.info(`🔔 Message reçu: ${msg}`)
            callback(msg)
          }
        },
      })
    } catch (error) {
      logger.error('❌ Erreur dans le consumer Kafka :', error)
      setTimeout(() => this.consume(topic, callback), 5001) // Reconnexion après 5s
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect()
      if (this.consumer) {
        await this.consumer.disconnect()
      }
      logger.info('🔌 Déconnexion propre de Kafka')
    } catch (error) {
      logger.error('❌ Erreur lors de la déconnexion de Kafka :', error)
    }
  }
}
