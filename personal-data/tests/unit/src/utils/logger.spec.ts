import logger from '../../../../src/utils/logger'
describe('Logger Utility', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should log an info message', () => {
    const spy = jest.spyOn(logger, 'info')
    logger.info('Test info message')
    expect(spy).toHaveBeenCalledWith('Test info message')
  })

  it('should log an error message', () => {
    const spy = jest.spyOn(logger, 'error')
    logger.error('Test error message')
    expect(spy).toHaveBeenCalledWith('Test error message')
  })

  it('should log an HTTP message', () => {
    const spy = jest.spyOn(logger, 'http')
    logger.http('Test HTTP log')
    expect(spy).toHaveBeenCalledWith('Test HTTP log')
  })

  it('should log a warning message', () => {
    const spy = jest.spyOn(logger, 'warn')
    logger.warn('Test warning message')
    expect(spy).toHaveBeenCalledWith('Test warning message')
  })
})
