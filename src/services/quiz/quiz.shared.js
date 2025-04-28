export const quizPath = 'quiz'

export const quizMethods = ['find', 'get', 'create', 'patch', 'remove']

export const quizClient = client => {
  const connection = client.get('connection')

  client.use(quizPath, connection.service(quizPath), {
    methods: quizMethods
  })
}
