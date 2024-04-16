import express from 'express'
//import{ getAll } from '../controllers/todos
import * as TodoController from '../controllers/todo.controller'
import { validate } from '../utils/validate'
import { createTodoSchema, removeTodoSchema, updateTodoSchema } from '../validators/create-todo.validator'
import { update } from '../services/todo.service'
import { authenticateToken, isAdmin } from '../middlewares/authentication.middleware'
const route = express.Router()


route.get('/', authenticateToken, TodoController.getTodos)

route.post('/', validate(createTodoSchema), authenticateToken, TodoController.create)

route.patch('/:id', validate(updateTodoSchema), authenticateToken, TodoController.update)

route.delete('/:id', validate(removeTodoSchema), authenticateToken, isAdmin, TodoController.remove)

route.get('/:id', authenticateToken, TodoController.findTodosById)



export default route;