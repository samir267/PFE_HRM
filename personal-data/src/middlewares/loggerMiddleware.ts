/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import logger, { setLogContext, clearLogContext } from '../utils/logger'
import { sanitizeData } from '../utils/sanitize'
import { LogMeta } from '../types/LogMeta'
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = uuidv4()
  const correlationId = (req.headers['x-correlation-id'] as string) || uuidv4()

  // Set headers for downstream services
  res.setHeader('X-Request-ID', requestId)
  res.setHeader('X-Correlation-ID', correlationId)

  // Set log context
  setLogContext(requestId, correlationId)

  // Log incoming request
  const start = Date.now()
  const requestContext: LogMeta = {
    method: req.method,
    url: req.url,
    query: sanitizeData(req.query),
    body: sanitizeData(req.body),
    headers: sanitizeData(req.headers),
  }
  logger.http('HTTP Request', requestContext)

  // Override res.send to log response
  const originalSend = res.send
  res.send = function (body: unknown) {
    const responseContext: LogMeta = {
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
      body: sanitizeData(body),
    }
    logger.http('HTTP Response', responseContext)
    return originalSend.call(this, body)
  }

  // Cleanup on finish or error
  res.on('finish', clearLogContext)
  res.on('error', (err) => {
    logger.error('Response error', { error: err.message })
    clearLogContext()
  })

  next()
}
