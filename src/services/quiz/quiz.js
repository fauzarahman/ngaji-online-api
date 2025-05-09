// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  quizDataValidator,
  quizPatchValidator,
  quizQueryValidator,
  quizResolver,
  quizExternalResolver,
  quizDataResolver,
  quizPatchResolver,
  quizQueryResolver
} from './quiz.schema.js'
import { QuizService, getOptions } from './quiz.class.js'
import { quizPath, quizMethods } from './quiz.shared.js'

export * from './quiz.class.js'
export * from './quiz.schema.js'

import { fastJoin, alterItems } from 'feathers-hooks-common'

const moduleResolvers = {
  moduleDetail: async (quiz, context) => {
    if (quiz.modules_id) {
      try {
        const moduleService = context.app.service('modules');
        const modules = await moduleService.find({
          query: { id: quiz.modules_id },
          paginate: false
        });
        quiz.module_detail = modules[0] || null;
      } catch (error) {
        console.error('Error fetching module detail', error);
        quiz.module_detail = null;
      }
    }
  }
};

// A configure function that registers the service and its hooks via `app.configure`
export const quiz = app => {
  // Register our service on the Feathers application
  app.use(quizPath, new QuizService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: quizMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(quizPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(quizExternalResolver),
        schemaHooks.resolveResult(quizResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(quizQueryValidator), schemaHooks.resolveQuery(quizQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(quizDataValidator), schemaHooks.resolveData(quizDataResolver)],
      patch: [schemaHooks.validateData(quizPatchValidator), schemaHooks.resolveData(quizPatchResolver)],
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
