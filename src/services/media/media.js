// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  mediaDataValidator,
  mediaPatchValidator,
  mediaQueryValidator,
  mediaResolver,
  mediaExternalResolver,
  mediaDataResolver,
  mediaPatchResolver,
  mediaQueryResolver
} from './media.schema.js'
import { MediaService, getOptions } from './media.class.js'
import { mediaPath, mediaMethods } from './media.shared.js'

export * from './media.class.js'
export * from './media.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const media = app => {
  // Register our service on the Feathers application
  app.use(mediaPath, new MediaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mediaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mediaPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(mediaExternalResolver),
        schemaHooks.resolveResult(mediaResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(mediaQueryValidator), schemaHooks.resolveQuery(mediaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(mediaDataValidator), schemaHooks.resolveData(mediaDataResolver)],
      patch: [schemaHooks.validateData(mediaPatchValidator), schemaHooks.resolveData(mediaPatchResolver)],
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
