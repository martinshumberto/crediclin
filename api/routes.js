import { Router } from 'express'
import CustomerController from './controllers/CustomerController'
import UserController from './controllers/UserController'

const routes = new Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.get('/customers', CustomerController.index)
routes.post('/customers', CustomerController.store)
routes.put('/customers/:id', CustomerController.update)
routes.delete('/customers/:id', CustomerController.delete)

routes.get('/test', function (req, res) {
  res.send('Test successful')
})

export default routes
