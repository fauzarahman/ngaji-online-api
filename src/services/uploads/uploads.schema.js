import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Hanya definisi dasar (bisa kosong juga)
export const uploadsSchema = Type.Object({}, { additionalProperties: true })

export const uploadsValidator = getValidator(uploadsSchema, dataValidator)
export const uploadsResolver = resolve({})

export const uploadsExternalResolver = resolve({})

// Untuk create, izinkan semua
export const uploadsDataSchema = uploadsSchema
export const uploadsDataValidator = getValidator(uploadsDataSchema, dataValidator)
export const uploadsDataResolver = resolve({})

// Patch juga fleksibel
export const uploadsPatchSchema = uploadsSchema
export const uploadsPatchValidator = getValidator(uploadsPatchSchema, dataValidator)
export const uploadsPatchResolver = resolve({})

// Query schema fleksibel (atau kosongin)
export const uploadsQuerySchema = Type.Object({}, { additionalProperties: true })
export const uploadsQueryValidator = getValidator(uploadsQuerySchema, queryValidator)
export const uploadsQueryResolver = resolve({})
