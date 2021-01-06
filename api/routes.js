import { Router } from 'express'
import CustomerController from './controllers/CustomerController'
import SessionUserController from './controllers/SessionUserController'
import UserController from './controllers/UserController'
import auth from './middlewares/auth'

const routes = new Router()

routes.post('/auth/users/login', SessionUserController.store)
routes.get('/auth/users/logged', auth, SessionUserController.show)

routes.get('/users', auth, UserController.index)
routes.post('/users', auth, UserController.store)
routes.put('/users/:id', auth, UserController.update)
routes.delete('/users/:id', auth, UserController.delete)

routes.get('/customers', auth, CustomerController.index)
routes.post('/customers', auth, CustomerController.store)
routes.put('/customers/:id', auth, CustomerController.update)
routes.delete('/customers/:id', auth, CustomerController.delete)

routes.get('/test', function (req, res) {
  res.send('Test successful')
})

export default routes
