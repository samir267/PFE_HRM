// Importez la fonction chunk
import mongoose from 'mongoose'
import { chunk, kebabCase, snakeCase } from '../../../../src/utils/string.utils'

describe('chunk function', () => {
  test('should split array into chunks of specified size', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const size = 2
    const result = chunk(array, size)
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
  })

  test('should handle empty array', () => {
    const array: number[] = []
    const size = 2
    const result = chunk(array, size)
    expect(result).toEqual([])
  })
})

describe('kebabCase function', () => {
  test('should convert string to kebab-case', () => {
    const str = 'HelloWorld'
    const result = kebabCase(str)
    expect(result).toBe('hello-world')
  })

  test('should handle already kebab-case string', () => {
    const str = 'hello-world'
    const result = kebabCase(str)
    expect(result).toBe('hello-world')
  })
})

describe('snakeCase function', () => {
  test('should convert string to snake_case', () => {
    const str = 'HelloWorld'
    const result = snakeCase(str)
    expect(result).toBe('hello_world')
  })

  test('should handle already snake_case string', () => {
    const str = 'hello_world'
    const result = snakeCase(str)
    expect(result).toBe('hello_world')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
