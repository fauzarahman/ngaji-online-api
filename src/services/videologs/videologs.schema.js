// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const videologsSchema = Type.Object({
  id: Type.Number(),
  parent_id: Type.Number(),
  user_id: Type.Number(),
  last_position: Type.Number(),
  duration: Type.Number(),
  is_complete: Type.Number(),
  updated_date: Type.String({ format: 'date-time' })
}, {
  $id: 'Videologs',
  additionalProperties: false
})

export const videologsValidator = getValidator(videologsSchema, dataValidator)
export const videologsResolver = resolve({})

// External resolver (optional sanitization)
export const videologsExternalResolver = resolve({})

// ✅ Schema for creating new entries (semua field kecuali ID)
export const videologsDataSchema = Type.Omit(videologsSchema, ['id'], {
  $id: 'VideologsData'
})
export const videologsDataValidator = getValidator(videologsDataSchema, dataValidator)

// ⏱️ Resolver: gunakan updated_date dari frontend, atau isi otomatis jika tidak ada
export const videologsDataResolver = resolve(value => ({
  ...value,
  updated_date: value.updated_date || new Date().toISOString()
}))

// ✏️ Schema for patching existing entries (semua optional)
export const videologsPatchSchema = Type.Partial(videologsSchema, {
  $id: 'VideologsPatch'
})
export const videologsPatchValidator = getValidator(videologsPatchSchema, dataValidator)
export const videologsPatchResolver = resolve({
  updated_date: async () => new Date().toISOString()
})

// 🔍 Schema for allowed query properties (ubah jika mau query by field lain)
export const videologsQueryProperties = Type.Pick(videologsSchema, ['id', 'user_id', 'parent_id'])

export const videologsQuerySchema = Type.Intersect([
  querySyntax(videologsQueryProperties),
  Type.Object({}, { additionalProperties: false })
], { additionalProperties: false })

export const videologsQueryValidator = getValidator(videologsQuerySchema, queryValidator)
export const videologsQueryResolver = resolve({})
