export const discussionPath = 'discussion'

export const discussionMethods = ['find', 'get', 'create', 'patch', 'remove']

export const discussionClient = client => {
  const connection = client.get('connection')

  client.use(discussionPath, connection.service(discussionPath), {
    methods: discussionMethods
  })
}
