import bodyParser from 'body-parser'
import express from 'express'
import './database'
import routes from './routes'

require('dotenv').config()
class App {
  constructor () {
    this.server = express()

    this.middlewares()
    this.router()
    this.listen()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(bodyParser.json())
  }

  router () {
    this.server.use(routes)
  }

  listen () {
    if (require.main === module) {
      const port = process.env.PORT || 3001
      this.server.listen(port, () => {
        console.log(`API server listening on port ${port}`)
      })
    }
  }
}

export default {
  path: '/api',
  handler: new App().server
}
