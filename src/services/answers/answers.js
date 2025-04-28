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
      all: []
    },
    error: {
      all: []
    }
  })
}
