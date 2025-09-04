/* eslint-disable prettier/prettier */
export interface ErrorResponse {
  status: 'error'
  statusCode: number
  message: string
  details?: unknown
}
