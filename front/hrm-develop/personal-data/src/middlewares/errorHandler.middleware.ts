/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/error.utils'
import {ErrorResponse} from '../types/Error.type'
import  logger  from '../utils/logger'


/**
 * Error handling middleware for Express applications.
 * This middleware handles both custom ApiError instances and native Error objects,
 * logging error details and sending a standardized error response to the client.
 *
 * @param {Error | ApiError} err - The error object, can be a custom ApiError or a native Error.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The next middleware function (not used here, but required by Express).
 * @returns {Response} - Returns the HTTP response with a standardized error object.
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction 
) => {
  // Initial error response structure with default values
  const errorResponse: ErrorResponse = {
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
  }
  let logLevel: 'error' | 'warn' | 'info' = 'error'

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    errorResponse.statusCode = err.statusCode
    errorResponse.message = err.message
    errorResponse.details = err.details

    // Determine log level and message based on status code
    switch (true) {
      case err.statusCode === 400:
      case err.statusCode === 422:
        logLevel = 'warn'
        errorResponse.message = `Validation Error: ${err.message}`
        break
      case err.statusCode === 401:
        errorResponse.message = `Unauthorized: ${err.message}`
        logLevel = 'warn'
        break
      case err.statusCode === 403:
        errorResponse.message = `Forbidden: ${err.message}`
        logLevel = 'warn'
        break
      case err.statusCode === 404:
        errorResponse.message = `Not Found: ${err.message}`
        logLevel = 'info'
        break
      case err.statusCode === 429:
        errorResponse.message = `Too Many Requests: ${err.message}`
        logLevel = 'warn'
        break
      case err.statusCode >= 500:
        errorResponse.message = err.message // Preserve custom message for server errors
        logLevel = 'error'
        break
      default:
        errorResponse.message = err.message
        logLevel = 'error'
    }
  } else {
    // Handle native Error objects
    errorResponse.statusCode = 500
    errorResponse.message = process.env.NODE_ENV === 'dev' ? err.message : 'Internal Server Error'
    if (process.env.NODE_ENV === 'dev') {
      errorResponse.details = err.stack
    }
  }

  // Log the error details 
  const logMessage = `${req.method} ${req.path} - ${errorResponse.message}`
  logger[logLevel](logMessage, {
    statusCode: errorResponse.statusCode,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query,
  })

  // Send the standardized error response to the client
  return res.status(errorResponse.statusCode).json(errorResponse)
}

