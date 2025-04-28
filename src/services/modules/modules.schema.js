// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const modulesSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    video_header_id: Type.Number(),
    instructor_id: Type.Number(),
    weeks: Type.Number(),
    created_date: Type.String({ format: 'date-time' }),
    updated_date: Type.String({ format: 'date-time' })
  }
)
export const modulesValidator = getValidator(modulesSchema, dataValidator)
export const modulesResolver = resolve({})

export const modulesExternalResolver = resolve({})

// Schema for creating new entries
export const modulesDataSchema = modulesSchema

export const modulesDataValidator = getValidator(modulesDataSchema, dataValidator)
export const modulesDataResolver = resolve({
  created_date: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const modulesPatchSchema = Type.Partial(modulesSchema, {
  $id: 'ModulesPatch'
})
export const modulesPatchValidator = getValidator(modulesPatchSchema, dataValidator)
export const modulesPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const modulesQueryProperties = Type.Pick(modulesSchema, ['id', 'text'])
export const modulesQuerySchema = Type.Intersect(
  [
    querySyntax(modulesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const modulesQueryValidator = getValidator(modulesQuerySchema, queryValidator)
export const modulesQueryResolver = resolve({})
