// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const sectionsSchema = Type.Object(
  {
    id: Type.Number(),
    section_name: Type.String()
  },
  { $id: 'Sections', additionalProperties: false }
)
export const sectionsValidator = getValidator(sectionsSchema, dataValidator)
export const sectionsResolver = resolve({})

export const sectionsExternalResolver = resolve({})

// Schema for creating new entries
export const sectionsDataSchema = Type.Pick(sectionsSchema, ['section_name'], {
  $id: 'SectionsData'
})
export const sectionsDataValidator = getValidator(sectionsDataSchema, dataValidator)
export const sectionsDataResolver = resolve({})

// Schema for updating existing entries
export const sectionsPatchSchema = Type.Partial(sectionsSchema, {
  $id: 'SectionsPatch'
})
export const sectionsPatchValidator = getValidator(sectionsPatchSchema, dataValidator)
export const sectionsPatchResolver = resolve({})

// Schema for allowed query properties
export const sectionsQueryProperties = Type.Pick(sectionsSchema, ['id', 'section_name'])
export const sectionsQuerySchema = Type.Intersect(
  [
    querySyntax(sectionsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const sectionsQueryValidator = getValidator(sectionsQuerySchema, queryValidator)
export const sectionsQueryResolver = resolve({})
