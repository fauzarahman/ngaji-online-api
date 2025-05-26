// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  lessonsDataValidator,
  lessonsPatchValidator,
  lessonsQueryValidator,
  lessonsResolver,
  lessonsExternalResolver,
  lessonsDataResolver,
  lessonsPatchResolver,
  lessonsQueryResolver
} from './lessons.schema.js'
import { LessonsService, getOptions } from './lessons.class.js'
import { lessonsPath, lessonsMethods } from './lessons.shared.js'

export * from './lessons.class.js'
export * from './lessons.schema.js'

import { authorize } from '../../hooks/authorize.js'

import { fastJoin, alterItems } from 'feathers-hooks-common'

const moduleResolvers = {
  moduleDetail: async (lesson, context) => {
    if (lesson.module_id) {
      try {
        const moduleService = context.app.service('modules');
        const modules = await moduleService.find({
          query: { id: lesson.module_id },
          paginate: false
        });
        lesson.module_detail = modules[0] || null;
      } catch (error) {
        console.error('Error fetching module detail', error);
        lesson.module_detail = null;
      }
    }
  }
};

// A configure function that registers the service and its hooks via `app.configure`
export const lessons = app => {
  // Register our service on the Feathers application
  app.use(lessonsPath, new LessonsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: lessonsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(lessonsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),  
        schemaHooks.resolveExternal(lessonsExternalResolver),
        schemaHooks.resolveResult(lessonsResolver)
      ],
      create: [],
      patch: [],
      remove: []
    },
    before: {
      all: [schemaHooks.validateQuery(lessonsQueryValidator), schemaHooks.resolveQuery(lessonsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(lessonsDataValidator), schemaHooks.resolveData(lessonsDataResolver)],
      patch: [schemaHooks.validateData(lessonsPatchValidator), schemaHooks.resolveData(lessonsPatchResolver)],
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
