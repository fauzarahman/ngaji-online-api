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

import { fastJoin, alterItems } from 'feathers-hooks-common'

const userResolvers = {
  userRole: async (profile, context) => {
    if (profile.user_id) {
      try {
        const userService = context.app.service('users');
        const users = await userService.find({
          query: { id: profile.user_id },
          paginate: false
        });
        profile.user_role = users[0].role || null;
      } catch (error) {
        console.error('Error fetching instructor profile', error);
        profile.user_role = null;
      }
    }
  }
};

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
      remove: [authenticate('jwt')]
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
      find: [
        alterItems(userResolvers.userRole)  // 🔥 pindah ke AFTER.FIND
      ],
      get: [
        alterItems(userResolvers.userRole)  // 🔥 juga di AFTER.GET
      ],
      all: []
    },
    error: {
      all: []
    }
  })
}
