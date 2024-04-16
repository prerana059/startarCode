/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
// import { getAll } from '../controllers/todo.controller'
import { validate } from '../utils/validate'
import * as UserController from '../controllers/user.controller'
import { createUserDto } from '../validators/create-user.validator'
import { authenticateToken } from '../middlewares/authentication.middleware'
const route = express.Router()


route.post('/login', UserController.login)

route.post('/signup', validate(createUserDto), UserController.create)




export default route;