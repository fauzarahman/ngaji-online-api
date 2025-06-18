// src/services/profiles/profiles.schema.js
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// 🧩 Main schema (semua properti, digunakan untuk full read/query)
export const profilesSchema = Type.Object({
  id: Type.Number(),
  user_id: Type.Number(),
  display_name: Type.String(),
  jobtitle: Type.String(),
  tagline: Type.String(),
  about_me: Type.String(),
  skills: Type.String(),
  avatar: Type.String(),
  created_date: Type.String({ format: 'date-time' }),
  updated_date: Type.String({ format: 'date-time' })
})

export const profilesValidator = getValidator(profilesSchema, dataValidator)
export const profilesResolver = resolve({})

// 🌍 External resolver (kosongkan atau tambahkan sanitasi public field)
export const profilesExternalResolver = resolve({})

// 🛠️ Data schema untuk `create()` — hanya required field + optional lainnya
export const profilesDataSchema = Type.Intersect([
  Type.Pick(profilesSchema, ['user_id', 'display_name', 'jobtitle']),
  Type.Partial(Type.Pick(profilesSchema, [
    'tagline', 'about_me', 'skills', 'avatar', 'created_date'
  ])) // Tambahkan created_date agar tidak dibuang saat masuk
])

export const profilesDataValidator = getValidator(profilesDataSchema, dataValidator)
export const profilesDataResolver = resolve(
  (value) => (typeof value === 'object' && value !== null ? { ...value } : {}),
  {
    created_date: async () => new Date().toLocaleString('sv-SE')
  }
)

// ✏️ Schema untuk `patch()` — semua optional
export const profilesPatchSchema = Type.Partial(profilesSchema, { $id: 'ProfilesPatch' })

export const profilesPatchValidator = getValidator(profilesPatchSchema, dataValidator)
export const profilesPatchResolver = resolve(
  (value) => (typeof value === 'object' && value !== null ? { ...value } : {}),
  {
    updated_date: async () => new Date().toLocaleString('sv-SE')
  }
)

// 🔍 Query support (misal hanya cari berdasarkan ID dan display_name)
export const profilesQueryProperties = Type.Pick(profilesSchema, ['user_id', 'display_name'])

export const profilesQuerySchema = Type.Intersect([
  querySyntax(profilesQueryProperties),
  Type.Object({}, { additionalProperties: false })
], { additionalProperties: false })

export const profilesQueryValidator = getValidator(profilesQuerySchema, queryValidator)
export const profilesQueryResolver = resolve({})
