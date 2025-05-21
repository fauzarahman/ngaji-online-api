// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  answersDataValidator,
  answersPatchValidator,
  answersQueryValidator,
  answersResolver,
  answersExternalResolver,
  answersDataResolver,
  answersPatchResolver,
  answersQueryResolver
} from './answers.schema.js'
import { AnswersService, getOptions } from './answers.class.js'
import { answersPath, answersMethods } from './answers.shared.js'

export * from './answers.class.js'
export * from './answers.schema.js'

import { fastJoin, alterItems } from 'feathers-hooks-common'

const userResolvers = {
  userDetail: async (answer, context) => {
    if (answer.user_id) {
      try {
        const moduleService = context.app.service('profiles');
        const modules = await moduleService.find({
          query: { user_id: answer.user_id },
          paginate: false
        });
        answer.user_detail = modules[0] || null;
      } catch (error) {
        console.error('Error fetching module detail', error);
        answer.module_detail = null;
      }
    }
  }
};

const quizResolvers = {
  quizDetail: async (answer, context) => {
    if (answer.quiz_id) {
      try {
        const quizService = context.app.service('quiz');
        const quiz = await quizService.find({
          query: { id: answer.quiz_id },
          paginate: false
        });
        answer.quiz_detail = quiz[0] || null;
      } catch (error) {
        console.error('Error fetching quiz detail', error);
        answer.quiz_detail = null;
      }
    }
  }
};

// A configure function that registers the service and its hooks via `app.configure`
export const answers = app => {
  // Register our service on the Feathers application
  app.use(answersPath, new AnswersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: answersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(answersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(answersExternalResolver),
        schemaHooks.resolveResult(answersResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(answersQueryValidator), schemaHooks.resolveQuery(answersQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(answersDataValidator), schemaHooks.resolveData(answersDataResolver)],
      patch: [schemaHooks.validateData(answersPatchValidator), schemaHooks.resolveData(answersPatchResolver)],
      remove: []
    },
    after: {
      find: [
        alterItems(userResolvers.userDetail),
        alterItems(quizResolvers.quizDetail)  
      ],
      get: [
        alterItems(userResolvers.userDetail),
        alterItems(quizResolvers.quizDetail)  
      ],
      all: []
    },
    error: {
      all: []
    }
  })
}
