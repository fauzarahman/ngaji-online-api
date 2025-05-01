// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  videologsDataValidator,
  videologsPatchValidator,
  videologsQueryValidator,
  videologsResolver,
  videologsExternalResolver,
  videologsDataResolver,
  videologsPatchResolver,
  videologsQueryResolver
} from './videologs.schema.js'
import { VideologsService, getOptions } from './videologs.class.js'
import { videologsPath, videologsMethods } from './videologs.shared.js'

import { fastJoin, alterItems } from 'feathers-hooks-common'

export * from './videologs.class.js'
export * from './videologs.schema.js'

const moduleResolvers = {
  moduleDetail: async (videolog, context) => {
    if (videolog.parent_id) {
      try {
        const moduleService = context.app.service('modules');
        const modules = await moduleService.find({
          query: { id: videolog.parent_id },
          paginate: false
        });
        videolog.module_detail = modules[0] || null;
      } catch (error) {
        console.error('Error fetching module detail', error);
        videolog.module_detail = null;
      }
    }
  }
};

// A configure function that registers the service and its hooks via `app.configure`
export const videologs = app => {
  // Register our service on the Feathers application
  app.use(videologsPath, new VideologsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: videologsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(videologsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(videologsExternalResolver),
        schemaHooks.resolveResult(videologsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(videologsQueryValidator),
        schemaHooks.resolveQuery(videologsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(videologsDataValidator),
        schemaHooks.resolveData(videologsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(videologsPatchValidator),
        schemaHooks.resolveData(videologsPatchResolver)
      ],
      remove: []
    },
    after: {
      find: [
        alterItems(moduleResolvers.moduleDetail)  // 🔥 pindah ke AFTER.FIND
      ],
      get: [
        alterItems(moduleResolvers.moduleDetail)  // 🔥 juga di AFTER.GET
      ],
      all: []
    },
    error: {
      all: []
    }
  })
}
