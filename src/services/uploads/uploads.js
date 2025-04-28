// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import { fileUpload } from '../../hooks/fileUpload.js';

import {
  uploadsDataValidator,
  uploadsPatchValidator,
  uploadsQueryValidator,
  uploadsResolver,
  uploadsExternalResolver,
  uploadsDataResolver,
  uploadsPatchResolver,
  uploadsQueryResolver
} from './uploads.schema.js'
import { UploadsService, getOptions } from './uploads.class.js'
import { uploadsPath, uploadsMethods } from './uploads.shared.js'

export * from './uploads.class.js'
export * from './uploads.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const uploads = app => {
  // Register our service on the Feathers application
  app.use(uploadsPath, new UploadsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: uploadsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(uploadsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(uploadsExternalResolver), schemaHooks.resolveResult(uploadsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(uploadsQueryValidator), schemaHooks.resolveQuery(uploadsQueryResolver)],
      find: [],
      get: [],
      create: [],
      patch: [schemaHooks.validateData(uploadsPatchValidator), schemaHooks.resolveData(uploadsPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
