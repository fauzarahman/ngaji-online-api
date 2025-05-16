// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  sectionsDataValidator,
  sectionsPatchValidator,
  sectionsQueryValidator,
  sectionsResolver,
  sectionsExternalResolver,
  sectionsDataResolver,
  sectionsPatchResolver,
  sectionsQueryResolver
} from './sections.schema.js'
import { SectionsService, getOptions } from './sections.class.js'
import { sectionsPath, sectionsMethods } from './sections.shared.js'

export * from './sections.class.js'
export * from './sections.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const sections = app => {
  // Register our service on the Feathers application
  app.use(sectionsPath, new SectionsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sectionsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sectionsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(sectionsExternalResolver),
        schemaHooks.resolveResult(sectionsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(sectionsQueryValidator),
        schemaHooks.resolveQuery(sectionsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(sectionsDataValidator),
        schemaHooks.resolveData(sectionsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(sectionsPatchValidator),
        schemaHooks.resolveData(sectionsPatchResolver)
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
