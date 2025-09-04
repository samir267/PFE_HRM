/**
 * @function   function to split an array into chunks of a specified size.
 * @param array
 * @param size
 * @returns object
 */
export function chunk<T>(array: T[], size: number): object {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )
}
/**
 * @function  function return a kebabCase formatted string
 * @param str
 * @returns
 */
export function kebabCase(str: string): string {
  return str
    .replace(/^[A-Z]/, (match) => match.toLowerCase())
    .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
}
/**
 * @function function return a snakeCase formatted string
 * @param str
 * @returns
 */
export function snakeCase(str: string): string {
  return str
    .replace(/^[A-Z]/, (match) => match.toLowerCase())
    .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
}
