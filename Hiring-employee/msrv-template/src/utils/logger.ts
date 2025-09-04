/* eslint-disable prettier/prettier */
import logger from '../configs/logger.config'
import { LogMeta } from '../types/LogMeta'

// Set dynamic log context for request tracing
export const setLogContext = (requestId: string, correlationId: string): void => {
  logger.defaultMeta = { requestId, correlationId } as LogMeta
}

// Clear log context after request completion
export const clearLogContext = (): void => {
  logger.defaultMeta = {} as LogMeta
}

// Utility to log with additional context
export const logWithContext = (
  level: string,
  message: string,
  context: Record<string, unknown> = {}
): void => {
  logger.log({ level, message, ...context })
}

export default logger
