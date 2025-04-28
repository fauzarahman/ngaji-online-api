// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const videologsSchema = Type.Object(
  {
    id: Type.Number(),
    parent_id: Type.Number(),
    user_id: Type.Number(),
    last_position: Type.Number(),
    user_id: Type.Number(),
    duration: Type.Number(),
    is_complete: Type.Number(),
    updated_date: Type.String({ format: 'date-time' })
  },
  { $id: 'Videologs', additionalProperties: false }
)
export const videologsValidator = getValidator(videologsSchema, dataValidator)
export const videologsResolver = resolve({})

export const videologsExternalResolver = resolve({})

// Schema for creating new entries
export const videologsDataSchema = Type.Pick(videologsSchema, ['text'], {
  $id: 'VideologsData'
})
export const videologsDataValidator = getValidator(videologsDataSchema, dataValidator)
export const videologsDataResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const videologsPatchSchema = Type.Partial(videologsSchema, {
  $id: 'VideologsPatch'
})
export const videologsPatchValidator = getValidator(videologsPatchSchema, dataValidator)
export const videologsPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const videologsQueryProperties = Type.Pick(videologsSchema, ['id', 'text'])
export const videologsQuerySchema = Type.Intersect(
  [
    querySyntax(videologsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const videologsQueryValidator = getValidator(videologsQuerySchema, queryValidator)
export const videologsQueryResolver = resolve({})
