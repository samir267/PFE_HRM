// import CircuitBreakerService from '../../../src/service/CircuitBreaker.service'
import axios from 'axios'
import CircuitBreakerService from '../../../src/service/CircuitBreaker.service'

jest.mock('axios') // Mock d'axios

describe('CircuitBreakerService', () => {
  const mockUrl = 'http://example.com'

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('devrait réussir un appel API quand tout fonctionne bien', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: { success: true } })

    const result = await CircuitBreakerService.fetchData(mockUrl)

    expect(result).toEqual({ success: true })
    expect(axios.get).toHaveBeenCalledWith(mockUrl, expect.any(Object))
  })

  test('devrait ouvrir le circuit breaker après plusieurs échecs', async () => {
    ;(axios.get as jest.Mock).mockRejectedValue(new Error('Erreur réseau'))

    for (let i = 0; i < 5; i++) {
      try {
        await CircuitBreakerService.fetchData(mockUrl)
      } catch (error) {}
    }

    expect(CircuitBreakerService.state).toBe('OPEN')
  })

  test('devrait retourner un message de secours quand le breaker est ouvert', async () => {
    ;(axios.get as jest.Mock).mockRejectedValue(new Error('Erreur réseau'))

    for (let i = 0; i < 5; i++) {
      try {
        await CircuitBreakerService.fetchData(mockUrl)
      } catch (error) {}
    }

    const result = await CircuitBreakerService.fetchData(mockUrl)
    expect(result).toEqual({ message: 'Service temporairement indisponible' })
  })
})
