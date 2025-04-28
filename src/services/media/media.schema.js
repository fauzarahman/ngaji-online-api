// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const mediaSchema = Type.Object(
  {
    id: Type.Number(),
    url: Type.String(),
    thumbnail: Type.String(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' })
  }
)
export const mediaValidator = getValidator(mediaSchema, dataValidator)
export const mediaResolver = resolve({})

export const mediaExternalResolver = resolve({})

// Schema for creating new entries
export const mediaDataSchema = mediaSchema

export const mediaDataValidator = getValidator(mediaDataSchema, dataValidator)
export const mediaDataResolver = resolve({
  created_date: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const mediaPatchSchema = Type.Partial(mediaSchema, {
  $id: 'MediaPatch'
})
export const mediaPatchValidator = getValidator(mediaPatchSchema, dataValidator)
export const mediaPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const mediaQueryProperties = Type.Pick(mediaSchema, ['id', 'text'])
export const mediaQuerySchema = Type.Intersect(
  [
    querySyntax(mediaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const mediaQueryValidator = getValidator(mediaQuerySchema, queryValidator)
export const mediaQueryResolver = resolve({})
