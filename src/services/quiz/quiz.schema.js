// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const quizSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.String(),
    question: Type.String(),
    media_id: Type.Number(),
    answer_type: Type.String(),
    is_completed: Type.String(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' })

  }
)
export const quizValidator = getValidator(quizSchema, dataValidator)
export const quizResolver = resolve({})

export const quizExternalResolver = resolve({})

// Schema for creating new entries
export const quizDataSchema = quizSchema

export const quizDataValidator = getValidator(quizDataSchema, dataValidator)
export const quizDataResolver = resolve({
  created_date: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const quizPatchSchema = Type.Partial(quizSchema, {
  $id: 'QuizPatch'
})
export const quizPatchValidator = getValidator(quizPatchSchema, dataValidator)
export const quizPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const quizQueryProperties = Type.Pick(quizSchema, ['id', 'text'])
export const quizQuerySchema = Type.Intersect(
  [
    querySyntax(quizQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const quizQueryValidator = getValidator(quizQuerySchema, queryValidator)
export const quizQueryResolver = resolve({})
