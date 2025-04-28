// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import path from 'path'

import { configurationValidator } from './configuration.js'
import { logger } from './logger.js'
import { logError } from './hooks/log-error.js'
import { mysql } from './mysql.js'
import { authentication } from './authentication.js'
import { services } from './services/index.js'
import { channels } from './channels.js'
import { fileUploadMiddleware } from './middleware/file-upload.js'

const app = express(feathers())

// Load app configuration (from config/default.json etc.)
app.configure(configuration(configurationValidator))

// CORS dan file statis
app.use(cors())
app.use('/', serveStatic(app.get('public')))
app.use('/uploads', express.static(path.resolve('uploads')))  // expose uploaded files

// Register manual POST /uploads middleware BEFORE json/urlencoded
//    This is important so multer works before body-parser eats the body
app.post('/uploads', fileUploadMiddleware, async (req, res, next) => {
  try {
    console.log('[UPLOAD] req.file =', req.file)

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const fileInfo = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    }

    const result = await app.service('uploads').create(fileInfo)

    res.status(201).json(result)  // 201 Created
  } catch (err) {
    next(err)
  }
})

// Body parsers (placed AFTER upload route)
app.use(json())
app.use(urlencoded({ extended: true }))

// REST API + Realtime Socket
app.configure(rest())
app.configure(socketio({
  cors: {
    origin: app.get('origins')
  }
}))

// Configure DB, auth, services, channels
app.configure(mysql)
app.configure(authentication)
app.configure(services)
app.configure(channels)

// Error & 404 handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Global app hooks
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})

app.hooks({
  setup: [],
  teardown: []
})

export { app }
