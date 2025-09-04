/* eslint-disable prettier/prettier */
/**
 * Base class for all API errors, extending the native Error class.
 * @property {number} statusCode - HTTP status code
 * @property {string} errorCode - Unique identifier for the error type
 * @property {unknown} [details] - Optional additional error details
 */
export class ApiError extends Error {
  public readonly statusCode: number
  public readonly errorCode: string
  public readonly details?: unknown

  /**
   * Constructor for ApiError class
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {string} [errorCode] - Unique identifier for the error type (defaults to the class name)
   * @param {unknown} [details] - Optional additional error details
   */
  constructor(message: string, statusCode: number, errorCode?: string, details?: unknown) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode || this.constructor.name
    this.details = details
    this.name = this.constructor.name
    ;(Error as ErrorConstructor).captureStackTrace(this, this.constructor) // Type assertion to fix TS error
  }
}

// 400-Level Client Errors
export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad request', details?: unknown) {
    super(message, 400, 'BAD_REQUEST', details)
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed', details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class PaymentRequiredError extends ApiError {
  constructor(message: string = 'Payment required', details?: unknown) {
    super(message, 402, 'PAYMENT_REQUIRED', details)
  }
}
export class NotFoundError extends ApiError {
  constructor(message: string = '404 Not Found', details?: unknown) {
    super(message, 404, 'NOT_FOUND', details)
  }
}
export class MethodNotAllowedError extends ApiError {
  constructor(message: string = 'Method not allowed', details?: unknown) {
    super(message, 405, 'METHOD_NOT_ALLOWED', details)
  }
}

export class NotAcceptableError extends ApiError {
  constructor(message: string = 'Not acceptable', details?: unknown) {
    super(message, 406, 'NOT_ACCEPTABLE', details)
  }
}

export class ProxyAuthenticationRequiredError extends ApiError {
  constructor(message: string = 'Proxy authentication required', details?: unknown) {
    super(message, 407, 'PROXY_AUTH_REQUIRED', details)
  }
}

export class RequestTimeoutError extends ApiError {
  constructor(message: string = 'Request timeout', details?: unknown) {
    super(message, 408, 'REQUEST_TIMEOUT', details)
  }
}

export class GoneError extends ApiError {
  constructor(message: string = 'Resource gone', details?: unknown) {
    super(message, 410, 'GONE', details)
  }
}

export class LengthRequiredError extends ApiError {
  constructor(message: string = 'Length required', details?: unknown) {
    super(message, 411, 'LENGTH_REQUIRED', details)
  }
}

export class PreconditionFailedError extends ApiError {
  constructor(message: string = 'Precondition failed', details?: unknown) {
    super(message, 412, 'PRECONDITION_FAILED', details)
  }
}

export class PayloadTooLargeError extends ApiError {
  constructor(message: string = 'Payload too large', details?: unknown) {
    super(message, 413, 'PAYLOAD_TOO_LARGE', details)
  }
}

export class URITooLongError extends ApiError {
  constructor(message: string = 'URI too long', details?: unknown) {
    super(message, 414, 'URI_TOO_LONG', details)
  }
}

export class UnsupportedMediaTypeError extends ApiError {
  constructor(message: string = 'Unsupported media type', details?: unknown) {
    super(message, 415, 'UNSUPPORTED_MEDIA_TYPE', details)
  }
}

export class RangeNotSatisfiableError extends ApiError {
  constructor(message: string = 'Range not satisfiable', details?: unknown) {
    super(message, 416, 'RANGE_NOT_SATISFIABLE', details)
  }
}

export class ExpectationFailedError extends ApiError {
  constructor(message: string = 'Expectation failed', details?: unknown) {
    super(message, 417, 'EXPECTATION_FAILED', details)
  }
}

export class MisdirectedRequestError extends ApiError {
  constructor(message: string = 'Misdirected request', details?: unknown) {
    super(message, 421, 'MISDIRECTED_REQUEST', details)
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message: string = 'Unprocessable entity', details?: unknown) {
    super(message, 422, 'UNPROCESSABLE_ENTITY', details)
  }
}

export class LockedError extends ApiError {
  constructor(message: string = 'Resource locked', details?: unknown) {
    super(message, 423, 'LOCKED', details)
  }
}

export class TooEarlyError extends ApiError {
  constructor(message: string = 'Too early', details?: unknown) {
    super(message, 425, 'TOO_EARLY', details)
  }
}

export class UpgradeRequiredError extends ApiError {
  constructor(message: string = 'Upgrade required', details?: unknown) {
    super(message, 426, 'UPGRADE_REQUIRED', details)
  }
}

export class PreconditionRequiredError extends ApiError {
  constructor(message: string = 'Precondition required', details?: unknown) {
    super(message, 428, 'PRECONDITION_REQUIRED', details) // Fixed typo in errorCode
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = 'Too many requests', details?: unknown) {
    super(message, 429, 'TOO_MANY_REQUESTS', details)
  }
}

export class RequestHeaderFieldsTooLargeError extends ApiError {
  constructor(message: string = 'Request header fields too large', details?: unknown) {
    super(message, 431, 'REQUEST_HEADER_FIELDS_TOO_LARGE', details)
  }
}

export class UnavailableForLegalReasonsError extends ApiError {
  constructor(message: string = 'Unavailable for legal reasons', details?: unknown) {
    super(message, 451, 'UNAVAILABLE_FOR_LEGAL_REASONS', details)
  }
}

// 500-Level Server Errors
export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal server error', details?: unknown) {
    super(message, 500, 'INTERNAL_SERVER_ERROR', details)
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message: string = 'Service unavailable', details?: unknown) {
    super(message, 503, 'SERVICE_UNAVAILABLE', details)
  }
}

// Legacy classes from your initial code
export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication failed', details?: unknown) {
    super(message, 401, 'AUTHENTICATION_ERROR', details)
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = 'Not authorized', details?: unknown) {
    super(message, 403, 'AUTHORIZATION_ERROR', details)
  }
}
