export const answersPath = 'answers'

export const answersMethods = ['find', 'get', 'create', 'patch', 'remove']

export const answersClient = client => {
  const connection = client.get('connection')

  client.use(answersPath, connection.service(answersPath), {
    methods: answersMethods
  })
}
