/* eslint-disable prettier/prettier */
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import fs from 'fs'
import path from 'path'
import { LogMeta } from '../types/LogMeta'

/**
 * Ensures that the directory containing the log file exists.
 * If the directory does not exist, it is created.
 * @param {string} filename - The log file to check.
 */
const ensureLogDirectory = (filename: string) => {
  const dir = path.dirname(filename)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Centralized base format for all logs
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.errors({ stack: true }) // Include stack traces for errors
)

// Exclude error-level logs from info transports
const excludeErrorLevel = winston.format((info: winston.Logform.TransformableInfo) => {
  return info.level === 'error' ? false : info
})

// Custom JSON format for structured logging
const jsonFormat = winston.format.printf(
  ({ timestamp, level, message, requestId, correlationId, ...context }) => {
    return JSON.stringify(
      {
        timestamp,
        level: level.toUpperCase(),
        message,
        requestId: Boolean(requestId) || null,
        correlationId: Boolean(correlationId) || null,
        context: Boolean(context) || {},
      },
      null,
      2
    ) // Pretty-print JSON for readability
  }
)

// Specific formats for each transport
export const infoLogFormat = winston.format.combine(baseFormat, excludeErrorLevel(), jsonFormat)
export const errorLogFormat = winston.format.combine(baseFormat, jsonFormat)
export const middlewareLogFormat = winston.format.combine(baseFormat, jsonFormat)

/**
 * Creates a new DailyRotateFile transport with enhanced configuration.
 * @param {DailyRotateFile.DailyRotateFileTransportOptions} options - Transport options
 * @returns {DailyRotateFile} - The created transport
 */
const createTransport = (
  options: DailyRotateFile.DailyRotateFileTransportOptions
): DailyRotateFile => {
  const filename = options.filename || path.join(__dirname, '../../output/logs/default-%DATE%.log')

  // Ensure directory exists
  ensureLogDirectory(filename)

  return new DailyRotateFile({
    ...options,
    datePattern: process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD',
    maxSize: process.env.LOG_MAX_SIZE || '1g', // Configurable max size
    maxFiles: process.env.LOG_MAX_FILES || '14d', // Configurable retention
    zippedArchive: true, // Compress rotated logs
    eol: '\n', // Consistent line endings
    handleExceptions: options.level === 'error', // Only for error transport
    json: false, // Use custom JSON format
  })
}

// Logger instance with enhanced configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // Environment-based log level
  defaultMeta: {} as LogMeta, // Dynamic metadata
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: jsonFormat,
      handleExceptions: true, // Catch console exceptions
    }),
    createTransport({
      filename: path.join(__dirname, '../../output/logs/service-%DATE%.log'),
      level: 'info',
      format: infoLogFormat,
    }),
    createTransport({
      filename: path.join(__dirname, '../../output/logs/error-%DATE%.log'),
      level: 'error',
      format: errorLogFormat,
    }),
    createTransport({
      filename: path.join(__dirname, '../../output/logs/middleware-%DATE%.log'),
      level: 'http',
      format: middlewareLogFormat,
    }),
  ],
  exceptionHandlers: [
    createTransport({
      filename: path.join(__dirname, '../../output/logs/exceptions-%DATE%.log'),
      level: 'error',
      format: errorLogFormat,
    }),
  ],
  exitOnError: false, // Prevent process exit on error
})

// Handle logger errors
logger.on('error', (err) => console.error('Logger error:', err))

export default logger
