// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const lessonsSchema = Type.Object(
  {
    id: Type.Number(),
    module_id: Type.Number(),
    title: Type.String(),
    description: Type.String(),
    media_id: Type.Number(),
    week_number: Type.Number(),
    is_complete: Type.Number(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' })
  }
)
export const lessonsValidator = getValidator(lessonsSchema, dataValidator)
export const lessonsResolver = resolve({})

export const lessonsExternalResolver = resolve({})

// Schema for creating new entries
export const lessonsDataSchema = lessonsSchema

export const lessonsDataValidator = getValidator(lessonsDataSchema, dataValidator)
export const lessonsDataResolver = resolve({
  created_date: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const lessonsPatchSchema = Type.Partial(lessonsSchema, {
  $id: 'LessonsPatch'
})
export const lessonsPatchValidator = getValidator(lessonsPatchSchema, dataValidator)
export const lessonsPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const lessonsQueryProperties = Type.Pick(lessonsSchema, [
  'id',
  'module_id',
  'title',
  'description',
  'week_number',
  'is_complete'
]);

export const lessonsQuerySchema = Type.Intersect(
  [
    querySyntax(lessonsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const lessonsQueryValidator = getValidator(lessonsQuerySchema, queryValidator)
export const lessonsQueryResolver = resolve({})
