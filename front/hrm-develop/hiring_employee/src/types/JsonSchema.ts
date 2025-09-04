export interface JsonSchema {
  bsonType: string
  properties: Record<string, { bsonType: string }>
  required?: string[]
}
