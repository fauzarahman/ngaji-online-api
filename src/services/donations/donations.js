// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  donationsDataValidator,
  donationsPatchValidator,
  donationsQueryValidator,
  donationsResolver,
  donationsExternalResolver,
  donationsDataResolver,
  donationsPatchResolver,
  donationsQueryResolver
} from './donations.schema.js'
import { DonationsService, getOptions } from './donations.class.js'
import { donationsPath, donationsMethods } from './donations.shared.js'

export * from './donations.class.js'
export * from './donations.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const donations = app => {
  // Register our service on the Feathers application
  app.use(donationsPath, new DonationsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: donationsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(donationsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(donationsExternalResolver),
        schemaHooks.resolveResult(donationsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(donationsQueryValidator),
        schemaHooks.resolveQuery(donationsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(donationsDataValidator),
        schemaHooks.resolveData(donationsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(donationsPatchValidator),
        schemaHooks.resolveData(donationsPatchResolver)
      ],
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
