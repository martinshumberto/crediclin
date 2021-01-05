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
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(bodyParser.json())
  }

  router () {
    this.server.use(routes)
  }
}

module.exports = new App().server
