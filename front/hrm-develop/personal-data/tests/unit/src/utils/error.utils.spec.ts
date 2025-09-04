/* eslint-disable prettier/prettier */
import * as errorUtils from '../../../../src/utils/error.utils'

describe('error.utils', () => {
  it('ApiError with custom params', () => {
    const error = new errorUtils.ApiError('Test', 418, 'TEAPOT')
    expect(error.statusCode).toBe(418)
    expect(error.errorCode).toBe('TEAPOT')
  })

  it('BadRequestError', () => {
    const error = new errorUtils.BadRequestError()
    expect(error.statusCode).toBe(400)
  })

  it('PaymentRequiredError', () => {
    const error = new errorUtils.PaymentRequiredError()
    expect(error.statusCode).toBe(402)
  })

  it('MethodNotAllowedError', () => {
    const error = new errorUtils.MethodNotAllowedError()
    expect(error.statusCode).toBe(405)
  })

  it('NotAcceptableError', () => {
    const error = new errorUtils.NotAcceptableError()
    expect(error.statusCode).toBe(406)
  })

  it('ProxyAuthenticationRequiredError', () => {
    const error = new errorUtils.ProxyAuthenticationRequiredError()
    expect(error.statusCode).toBe(407)
  })

  it('RequestTimeoutError', () => {
    const error = new errorUtils.RequestTimeoutError()
    expect(error.statusCode).toBe(408)
  })

  it('GoneError', () => {
    const error = new errorUtils.GoneError()
    expect(error.statusCode).toBe(410)
  })

  it('AuthenticationError', () => {
    const error = new errorUtils.AuthenticationError()
    expect(error.statusCode).toBe(401)
  })

  it('AuthorizationError', () => {
    const error = new errorUtils.AuthorizationError()
    expect(error.statusCode).toBe(403)
  })

  it('NotFoundError', () => {
    const error = new errorUtils.NotFoundError()
    expect(error.statusCode).toBe(404)
  })

  it('UnprocessableEntityError', () => {
    const error = new errorUtils.UnprocessableEntityError()
    expect(error.statusCode).toBe(422)
  })

  it('TooManyRequestsError', () => {
    const error = new errorUtils.TooManyRequestsError()
    expect(error.statusCode).toBe(429)
  })

  it('InternalServerError', () => {
    const error = new errorUtils.InternalServerError()
    expect(error.statusCode).toBe(500)
  })

  it('ServiceUnavailableError', () => {
    const error = new errorUtils.ServiceUnavailableError()
    expect(error.statusCode).toBe(503)
  })
})


