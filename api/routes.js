import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = new Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.get('/test', function (req, res) {
  res.send('Test successful')
})

export default routes
