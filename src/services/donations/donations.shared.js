export const donationsPath = 'donations'

export const donationsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const donationsClient = client => {
  const connection = client.get('connection')

  client.use(donationsPath, connection.service(donationsPath), {
    methods: donationsMethods
  })
}
