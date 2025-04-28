export const modulesPath = 'modules'

export const modulesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const modulesClient = client => {
  const connection = client.get('connection')

  client.use(modulesPath, connection.service(modulesPath), {
    methods: modulesMethods
  })
}
