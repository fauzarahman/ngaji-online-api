export const mediaPath = 'media'

export const mediaMethods = ['find', 'get', 'create', 'patch', 'remove']

export const mediaClient = client => {
  const connection = client.get('connection')

  client.use(mediaPath, connection.service(mediaPath), {
    methods: mediaMethods
  })
}
