// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  discussionDataValidator,
  discussionPatchValidator,
  discussionQueryValidator,
  discussionResolver,
  discussionExternalResolver,
  discussionDataResolver,
  discussionPatchResolver,
  discussionQueryResolver
} from './discussion.schema.js'
import { DiscussionService, getOptions } from './discussion.class.js'
import { discussionPath, discussionMethods } from './discussion.shared.js'

export * from './discussion.class.js'
export * from './discussion.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const discussion = app => {
  // Register our service on the Feathers application
  app.use(discussionPath, new DiscussionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: discussionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(discussionPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(discussionExternalResolver),
        schemaHooks.resolveResult(discussionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(discussionQueryValidator),
        schemaHooks.resolveQuery(discussionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(discussionDataValidator),
        schemaHooks.resolveData(discussionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(discussionPatchValidator),
        schemaHooks.resolveData(discussionPatchResolver)
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
