export const videologsPath = 'videologs'

export const videologsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const videologsClient = client => {
  const connection = client.get('connection')

  client.use(videologsPath, connection.service(videologsPath), {
    methods: videologsMethods
  })
}
