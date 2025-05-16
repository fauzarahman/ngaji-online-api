// server.js
import https from 'https'
import fs from 'fs'
import { app } from './app.js'

const port = app.get('port') || 3030
const key = fs.readFileSync('./ssl/key.pem')
const cert = fs.readFileSync('./ssl/cert.pem')

https.createServer({ key, cert }, app).listen(port, () => {
  console.log(`🚀 HTTPS Feathers server listening at https://localhost:${port}`)
})
