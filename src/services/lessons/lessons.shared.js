export const lessonsPath = 'lessons'

export const lessonsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const lessonsClient = client => {
  const connection = client.get('connection')

  client.use(lessonsPath, connection.service(lessonsPath), {
    methods: lessonsMethods
  })
}
