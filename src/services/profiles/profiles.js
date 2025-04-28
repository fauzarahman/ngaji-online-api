// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  profilesDataValidator,
  profilesPatchValidator,
  profilesQueryValidator,
  profilesResolver,
  profilesExternalResolver,
  profilesDataResolver,
  profilesPatchResolver,
  profilesQueryResolver
} from './profiles.schema.js'
import { ProfilesService, getOptions } from './profiles.class.js'
import { profilesPath, profilesMethods } from './profiles.shared.js'

import { authorize } from '../../hooks/authorize.js'

export * from './profiles.class.js'
export * from './profiles.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const profiles = app => {
  // Register our service on the Feathers application
  app.use(profilesPath, new ProfilesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: profilesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(profilesPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(profilesExternalResolver), schemaHooks.resolveResult(profilesResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [ authenticate('jwt'), authorize(['admin']) ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(profilesQueryValidator),
        schemaHooks.resolveQuery(profilesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(profilesDataValidator),
        schemaHooks.resolveData(profilesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(profilesPatchValidator),
        schemaHooks.resolveData(profilesPatchResolver)
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
