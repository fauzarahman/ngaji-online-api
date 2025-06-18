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
    video_header_id: Type.String(),
    thumbnail:Type.String(),
    created_by: Type.Number(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' }),
    is_deleted: Type.Number()
  },
  { $id: 'Lessons', additionalProperties: false }
)
export const lessonsValidator = getValidator(lessonsSchema, dataValidator)
export const lessonsResolver = resolve({})

export const lessonsExternalResolver = resolve({})

// Schema for creating new entries
export const lessonsDataSchema = Type.Pick(lessonsSchema, [
  'module_id',
  'title',
  'description',
  'video_header_id',
  'thumbnail',
  'created_by'
], { $id: 'LessonsData' })

export const lessonsDataValidator = getValidator(lessonsDataSchema, dataValidator)
export const lessonsDataResolver = resolve({
  created_date: async () => new Date().toLocaleString('sv-SE')
})

// Schema for updating existing entries
export const lessonsPatchSchema = Type.Partial(lessonsSchema, {
  $id: 'LessonsPatch'
})
export const lessonsPatchValidator = getValidator(lessonsPatchSchema, dataValidator)
export const lessonsPatchResolver = resolve({
  updated_date: async () => new Date().toLocaleString('sv-SE')
})

// Schema for allowed query properties
export const lessonsQueryProperties = Type.Pick(lessonsSchema, [
  'id',
  'module_id',
  'title',
  'description',
  'week_number',
  'is_complete',
  'created_by',
  'is_deleted'
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
