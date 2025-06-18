// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const discussionSchema = Type.Object(
  {
    id: Type.Number(),
    parent_id: Type.Number(),
    content_id: Type.Number(),
    user_id: Type.Number(),
    content: Type.String(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' })
  }
)
export const discussionValidator = getValidator(discussionSchema, dataValidator)
export const discussionResolver = resolve({})

export const discussionExternalResolver = resolve({})

// Schema for creating new entries
export const discussionDataSchema = discussionSchema

export const discussionDataValidator = getValidator(discussionDataSchema, dataValidator)
export const discussionDataResolver = resolve({
  created_date: async () => new Date().toLocaleString('sv-SE')
})

// Schema for updating existing entries
export const discussionPatchSchema = Type.Partial(discussionSchema, {
  $id: 'DiscussionPatch'
})
export const discussionPatchValidator = getValidator(discussionPatchSchema, dataValidator)
export const discussionPatchResolver = resolve({
  updated_date: async () => new Date().toLocaleString('sv-SE')
})

// Schema for allowed query properties
export const discussionQueryProperties = Type.Pick(discussionSchema, ['id', 'text'])
export const discussionQuerySchema = Type.Intersect(
  [
    querySyntax(discussionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const discussionQueryValidator = getValidator(discussionQuerySchema, queryValidator)
export const discussionQueryResolver = resolve({})
