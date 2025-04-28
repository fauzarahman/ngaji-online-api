// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const answersSchema = Type.Object(
  {
    id: Type.Number(),
    lesson_id: Type.Number(),
    user_id: Type.Number(),
    answer_type: Type.String(),
    answer_value: Type.String(),
    checked_by: Type.Number(),
    is_passed: Type.Number(),
    score: Type.Number(),
    review_notes: Type.String(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' })
  }
)
export const answersValidator = getValidator(answersSchema, dataValidator)
export const answersResolver = resolve({})

export const answersExternalResolver = resolve({})

// Schema for creating new entries
export const answersDataSchema = answersSchema

export const answersDataValidator = getValidator(answersDataSchema, dataValidator)
export const answersDataResolver = resolve({
  created_date: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const answersPatchSchema = Type.Partial(answersSchema, {
  $id: 'AnswersPatch'
})
export const answersPatchValidator = getValidator(answersPatchSchema, dataValidator)
export const answersPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const answersQueryProperties = Type.Pick(answersSchema, ['id', 'text'])
export const answersQuerySchema = Type.Intersect(
  [
    querySyntax(answersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const answersQueryValidator = getValidator(answersQuerySchema, queryValidator)
export const answersQueryResolver = resolve({})
