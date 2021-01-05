import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = new Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

module.exports = routes
