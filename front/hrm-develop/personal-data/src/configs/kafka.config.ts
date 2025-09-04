// Chargement des variables d'environnement depuis le fichier .env
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

export interface KafkaConnectorConfig {
  clientId: string
  brokers: string[]
  ssl: boolean
  sasl?: {
    mechanism: 'plain' | 'scram-sha-256' | 'scram-sha-512'
    username: string
    password: string
  }
  consumerConfig: {
    groupId: string
    maxBytesPerPartition: number
    sessionTimeout: number
    heartbeatInterval: number // Nouvelle configuration pour les heartbeats
  }
}

export const kafkaConfig: KafkaConnectorConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || 'microservice-template',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'], // Permet de définir plusieurs brokers via une variable d'env
  ssl: process.env.KAFKA_SSL_ENABLED === 'true',
  consumerConfig: {
    groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'microservice-group',
    maxBytesPerPartition: 1048576, // 1MB, pour limiter la taille des partitions
    sessionTimeout: Number(process.env.KAFKA_SESSION_TIMEOUT) || 60000, // Timeout de session (60 secondes par défaut)
    heartbeatInterval: Number(process.env.KAFKA_HEARTBEAT_INTERVAL) || 20000, // Intervalle de heartbeat (20 secondes par défaut)
  },
}

// Gestion de la configuration SASL si activée
if (process.env.KAFKA_SASL_ENABLED === 'true') {
  kafkaConfig.sasl = {
    mechanism: process.env.KAFKA_SASL_MECHANISM as 'plain' | 'scram-sha-256' | 'scram-sha-512',
    username: process.env.KAFKA_SASL_USERNAME || '',
    password: process.env.KAFKA_SASL_PASSWORD || '',
  }
}
