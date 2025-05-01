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

import { fastJoin, alterItems } from 'feathers-hooks-common'

const moduleResolvers = {
  instructorProfile: async (module, context) => {
    if (module.instructor_id) {
      try {
        const profileService = context.app.service('profiles');
        const profiles = await profileService.find({
          query: { user_id: module.instructor_id },
          paginate: false
        });
        module.instructor_profile = profiles[0] || null;
      } catch (error) {
        console.error('Error fetching instructor profile', error);
        module.instructor_profile = null;
      }
    }
  }
};

export const modules = app => {
  app.use(modulesPath, new ModulesService(getOptions(app)), {
    methods: modulesMethods,
    events: []
  });

  app.service(modulesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(modulesExternalResolver),
        schemaHooks.resolveResult(modulesResolver)
      ],
      create: [authorize(['admin', 'guru'])],
      patch: [authorize(['admin', 'guru'])],
      remove: [authorize(['admin', 'guru'])]
    },
    before: {
      all: [
        schemaHooks.validateQuery(modulesQueryValidator),
        schemaHooks.resolveQuery(modulesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(modulesDataValidator),
        schemaHooks.resolveData(modulesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(modulesPatchValidator),
        schemaHooks.resolveData(modulesPatchResolver)
      ],
      remove: []
    },
    after: {
      find: [
        alterItems(moduleResolvers.instructorProfile)  // 🔥 pindah ke AFTER.FIND
      ],
      get: [
        alterItems(moduleResolvers.instructorProfile)  // 🔥 juga di AFTER.GET
      ],
      all: []
    },
    error: {
      all: []
    }
  })
}