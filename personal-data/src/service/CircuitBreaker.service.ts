import CircuitBreaker from 'opossum'
import axios from 'axios'
import { AxiosError } from 'axios'
import logger from '../utils/logger'

class CircuitBreakerService {
  private breaker: CircuitBreaker

  constructor() {
    this.breaker = new CircuitBreaker(
      (url: string) => this.apiCall(url), // Utilisation d'une fonction fléchée
      {
        timeout: 3000,
        errorThresholdPercentage: 10, // Après 10% d'échecs, le circuit s'ouvre
        resetTimeout: 10000, // Après 10s, il passe en half-open
      }
    )

    this.breaker.on('open', () => logger.warn('⚠️ Circuit breaker OUVERT : appels bloqués !'))
    this.breaker.on('halfOpen', () => logger.info('🟡 Circuit breaker en mode HALF-OPEN...'))
    this.breaker.on('close', () => logger.info('✅ Circuit breaker FERMÉ : tout est OK.'))
  }

  // Getter pour vérifier l'état du breaker
  public get state() {
    return this.breaker.opened ? 'OPEN' : this.breaker.halfOpen ? 'HALF-OPEN' : 'CLOSED'
  }

  // Fonction qui fait l'appel API
  private async apiCall(url: string): Promise<unknown> {
    try {
      logger.info(`🔍 Tentative d'appel API : ${url}`)

      // Validation simple de l'URL pour éviter les erreurs DNS
      try {
        new URL(url) // Ceci lancera une erreur si l'URL est invalide
      } catch (e) {
        throw new Error(`URL invalide: ${url}`)
      }

      const response = await axios.get(url, {
        timeout: 2500, // Timeout plus court que celui du circuit breaker
        validateStatus: function (status) {
          return status >= 200 && status < 500 // Accepter les réponses 2xx, 3xx, 4xx
        },
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      // Gérer l'erreur de façon plus détaillée
      if (axiosError.code === 'ENOTFOUND') {
        logger.error(`🚨 Hôte introuvable pour l'URL: ${url}`)
      } else if (axiosError.code === 'ECONNREFUSED') {
        logger.error(`🚨 Connexion refusée pour l'URL: ${url}`)
      } else {
        logger.error(`🚨 Erreur d'API (${url}):`, error)
      }
      throw error
    }
  }

  // Appeler une API protégée par le circuit breaker
  public async fetchData(url: string): Promise<unknown> {
    try {
      // Si on est en test, on peut utiliser une URL de mock
      const targetUrl =
        process.env.NODE_ENV === 'test' && process.env.MOCK_API_URL ? process.env.MOCK_API_URL : url

      return await this.breaker.fire(targetUrl)
    } catch (error) {
      logger.error('⚠️ Service indisponible, réponse de secours activée.')
      return { message: 'Service temporairement indisponible' }
    }
  }
}

export default new CircuitBreakerService()
