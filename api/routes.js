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
routes.get('/user/:id', auth, UserController.show)
routes.put('/user/:id', auth, UserController.update)
routes.delete('/user/:id', auth, UserController.delete)

routes.get('/customers', auth, CustomerController.index)
routes.post('/customers', auth, CustomerController.store)
routes.get('/customer/:id', auth, CustomerController.show)
routes.put('/customer/:id', auth, CustomerController.update)
routes.delete('/customer/:id', auth, CustomerController.delete)

routes.get('/test', function (req, res) {
  res.send('Test successful')
})

export default routes
