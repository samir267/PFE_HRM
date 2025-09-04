/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import * as errorUtils from '../../../../src/utils/error.utils';
import { errorHandler } from '../../../../src/middlewares/errorHandler.middleware';
import logger from '../../../../src/utils/logger';

// Mock the logger as a default export
jest.mock('../../../../src/utils/logger', () => ({
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
}));

// Mock Express Response
const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

// Mock Express Request
const mockRequest = (method = 'GET', path = '/test', body = {}, query = {}): Request =>
  ({ method, path, body, query }) as Request;

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('errorHandler Middleware', () => {
  describe('ApiError Handling', () => {
    it('handles BadRequestError (400) with warn log', () => {
      const error = new errorUtils.BadRequestError('Invalid input', { field: 'value' });
      const req = mockRequest('POST', '/api', { data: 'test' }, { id: '1' });
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 400,
        message: 'Validation Error: Invalid input',
        details: { field: 'value' },
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'POST /api - Validation Error: Invalid input',
        expect.objectContaining({
          statusCode: 400,
          method: 'POST',
          path: '/api',
          body: { data: 'test' },
          query: { id: '1' },
          stack: error.stack,
        })
      );
    });

    it('handles ValidationError (422) with warn log', () => {
      const error = new errorUtils.ApiError('Unprocessable entity', 422, 'VALIDATION_ERROR');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 422,
        message: 'Validation Error: Unprocessable entity',
        details: undefined,
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'GET /test - Validation Error: Unprocessable entity',
        expect.any(Object)
      );
    });

    it('handles AuthenticationError (401) with warn log', () => {
      const error = new errorUtils.AuthenticationError('Invalid credentials');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 401,
        message: 'Unauthorized: Invalid credentials',
        details: undefined,
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'GET /test - Unauthorized: Invalid credentials',
        expect.any(Object)
      );
    });

    it('handles AuthorizationError (403) with warn log', () => {
      const error = new errorUtils.AuthorizationError('Access denied');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 403,
        message: 'Forbidden: Access denied',
        details: undefined,
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'GET /test - Forbidden: Access denied',
        expect.any(Object)
      );
    });

    it('handles NotFoundError (404) with info log', () => {
      const error = new errorUtils.NotFoundError('Resource not found');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 404,
        message: 'Not Found: Resource not found',
        details: undefined,
      });
      expect(logger.info).toHaveBeenCalledWith(
        'GET /test - Not Found: Resource not found',
        expect.any(Object)
      );
    });

    it('handles TooManyRequestsError (429) with warn log', () => {
      const error = new errorUtils.TooManyRequestsError('Rate limit exceeded');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 429,
        message: 'Too Many Requests: Rate limit exceeded',
        details: undefined,
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'GET /test - Too Many Requests: Rate limit exceeded',
        expect.any(Object)
      );
    });

    it('handles InternalServerError (500) with error log', () => {
      const error = new errorUtils.InternalServerError('Database failure');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 500,
        message: 'Database failure',
        details: undefined,
      });
      expect(logger.error).toHaveBeenCalledWith(
        'GET /test - Database failure',
        expect.any(Object)
      );
    });

    it('handles custom ApiError (410) with error log by default', () => {
      const error = new errorUtils.ApiError('Resource gone', 410, 'GONE');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(410);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 410,
        message: 'Resource gone',
        details: undefined,
      });
      expect(logger.error).toHaveBeenCalledWith(
        'GET /test - Resource gone',
        expect.any(Object)
      );
    });

    it('handles unhandled status code (418) with error log', () => {
      const error = new errorUtils.ApiError('I’m a teapot', 418, 'TEAPOT');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(418);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 418,
        message: 'I’m a teapot',
        details: undefined,
      });
      expect(logger.error).toHaveBeenCalledWith(
        'GET /test - I’m a teapot',
        expect.any(Object)
      );
    });
  });

  describe('Native Error Handling', () => {
    it('handles generic Error in production with error log', () => {
      process.env.NODE_ENV = 'production';
      const error = new Error('Unexpected error');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 500,
        message: 'Internal Server Error',
        details: undefined,
      });
      expect(logger.error).toHaveBeenCalledWith(
        'GET /test - Internal Server Error',
        expect.objectContaining({
          statusCode: 500,
          stack: error.stack,
        })
      );
    });

    it('handles generic Error in dev with stack trace', () => {
      process.env.NODE_ENV = 'dev';
      const error = new Error('Unexpected error');
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 500,
        message: 'Unexpected error',
        details: error.stack,
      });
      expect(logger.error).toHaveBeenCalledWith(
        'GET /test - Unexpected error',
        expect.objectContaining({
          statusCode: 500,
          stack: error.stack,
        })
      );
    });
  });
});
