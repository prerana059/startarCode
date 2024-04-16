/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction,Request,Response } from "express"
import *as TodoService from '../services/todo.service'
import { any, number } from "zod"
import { Prisma } from "@prisma/client"
import Boom  from "@hapi/boom"
import HttpStatus from 'http-status-codes'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTodos =async ( req: Request, res: Response, next: NextFunction ) =>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    try{
    const activeStatus = req.query.active 
    const loggedInUserId = (req as any).user.userId
    const todos = await TodoService.getTodos(loggedInUserId)
    res.send(todos)
    }catch  (err) {
        next(err)
        }
}

export const create = async (req: Request, res: Response, next: NextFunction) =>{
    try {
    const todo: any = req.body
    console.log(req.body, 'is request body')
    const userId = (req as any).user.userId
    const todos = await TodoService.create(todo, userId)
    res.send(HttpStatus.CREATED).send(todos)
    } catch (err) {
        next(err)
        }
}

export const update = async (req: Request, res: Response, next: NextFunction) =>{
    try{
    const todo: any = req.body
    const id = Number(req.params.id)
    const loggedInUserId = (req as any).user.user
    const todos = await TodoService.update(id, todo)
    res.send(HttpStatus.NO_CONTENT).send(todos)
    } catch (err) {
    next(err)
    }
}

export const remove =async (req: Request, res: Response, next: NextFunction) =>{
    try{
    const id = Number (req.params.id)

    const todos = await TodoService.remove(Number(id),(req as any).user.userId)
    res.send(HttpStatus.NO_CONTENT).send(todos)
    }  catch (err) {
        next(err)
    }
}

export const findTodosById =async ( req: Request, res: Response, next: NextFunction ) =>{
    try{
    const id = Number (req.params.id)
    const todos = await TodoService.findTodosById(id)
    res.send(HttpStatus.NOT_FOUND).send(todos)
    } catch (err) {
            next(err)
        }
    }
 



