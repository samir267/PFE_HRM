/* eslint-disable prettier/prettier */
export interface LogMeta {
    requestId?: string
    correlationId?: string
    [key: string]: unknown
  }
  