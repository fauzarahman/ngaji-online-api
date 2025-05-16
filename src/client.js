// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
export {}

export {}

export {}

export {}

export {}

export {}

export {}

export {}

export {}

export {}

export {}

export {}

/**
 * Returns a  client for the ngaji-yuk app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(lessonsClient)

  client.configure(modulesClient)

  client.configure(mediaClient)

  client.configure(discussionClient)

  client.configure(profilesClient)

  client.configure(answersClient)

  client.configure(quizClient)

  client.configure(videologsClient)

  client.configure(uploadsClient)

  client.configure(sectionsClient)

  return client
}
