/* eslint-disable prettier/prettier */
import { LogMeta } from '../types/LogMeta';
/**
 * Sanitizes an object by masking sensitive fields.
 * @param {any} data The object to sanitize.
 * @returns {any} The sanitized object.
 */
export const sanitizeData = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') return data;

  const sensitiveFields = ['password', 'token', 'creditcard', 'ssn', 'apikey'];
  let clonedData: LogMeta;

  try {
    // Clone the object to avoid modifying the original
    clonedData = JSON.parse(JSON.stringify(data)) as LogMeta;
  } catch (error) {
    console.error('Cloning error during sanitization:', error);
    // If cloning fails, return a masked version of all keys
    return Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: '****MASKED****' }), {});
  }

  /**
   * Recursively masks sensitive fields in the object.
   * @param {LogMeta} obj The object to mask.
   * @returns {LogMeta} The masked object.
   */
  const mask = (obj: LogMeta): LogMeta => {
    for (const key in obj) {
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
        // Mask the field
        obj[key] = '****MASKED****';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively mask objects
        mask(obj[key] as LogMeta);
      }
    }
    return obj;
  };

  try {
    return mask(clonedData);
  } catch (error) {
    console.error('Sanitization error:', error);
    // If masking fails, return a fully masked object
    return Object.keys(clonedData).reduce((acc, key) => ({ ...acc, [key]: '****MASKED****' }), {});
  }
};
