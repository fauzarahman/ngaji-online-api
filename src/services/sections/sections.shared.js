export const sectionsPath = 'sections'

export const sectionsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const sectionsClient = client => {
  const connection = client.get('connection')

  client.use(sectionsPath, connection.service(sectionsPath), {
    methods: sectionsMethods
  })
}
