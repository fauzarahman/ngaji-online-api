// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  modulesDataValidator,
  modulesPatchValidator,
  modulesQueryValidator,
  modulesResolver,
  modulesExternalResolver,
  modulesDataResolver,
  modulesPatchResolver,
  modulesQueryResolver
} from './modules.schema.js'
import { ModulesService, getOptions } from './modules.class.js'
import { modulesPath, modulesMethods } from './modules.shared.js'

export * from './modules.class.js'
export * from './modules.schema.js'

import { authorize } from '../../hooks/authorize.js'

// A configure function that registers the service and its hooks via `app.configure`
export const modules = app => {
  // Register our service on the Feathers application
  app.use(modulesPath, new ModulesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: modulesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(modulesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(modulesExternalResolver),
        schemaHooks.resolveResult(modulesResolver)
      ],
      create: [ authorize(['admin','guru']) ],
      patch: [ authorize(['admin','guru']) ],
      remove: [ authorize(['admin','guru']) ]
    },
    before: {
      all: [schemaHooks.validateQuery(modulesQueryValidator), schemaHooks.resolveQuery(modulesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(modulesDataValidator), schemaHooks.resolveData(modulesDataResolver)],
      patch: [schemaHooks.validateData(modulesPatchValidator), schemaHooks.resolveData(modulesPatchResolver)],
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
