/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import  Boom  from "@hapi/boom" 
import { PrismaClient} from "@prisma/client"
import { login } from "./user.service"
import { number } from "zod"

const prisma = new PrismaClient()
export const getTodos = async ( userId: number) =>{
    return prisma.todo.findMany({
        where: {userId: userId}
    })
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create = async (todo: any, userId: number) =>{
    try {
   return await prisma.todo.create({
        data: {
            userId: userId,
            name: todo.name
            
        },
    })
    console.log('deleted')
    
    }catch (err: any) {
        if (err.code === 'P2025'){
            throw Boom.notFound('Post not found')
            
        } else {
            throw err
        }
    }
}



export const update = async (id: number, todo:any) =>{
    try{
    return  await prisma.todo.update ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: {
        name: todo.name,
        
    },
    where: {
        id: id
    }
    })
    
    } catch (err: any) {
        if (err.code === 'P2025'){
            throw Boom.notFound('Post not found')
            
        } else {
            throw err
        }
    }
}


export const remove = async (id: Number, loggedInUserId: number) =>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment\
    try{
    return await prisma.todo.delete({
        where: {
            id: Number(id),
        },
    })
    
    } catch (err: any) {
        console.log('error aayo remove garda')
        console.log(err)
    if (err.code === 'P2025'){
        throw Boom.notFound('Post not found')
        
    } else {
        throw err
    }
}
    }

export const findTodosById = async ( id: Number) => {
    try{
    await prisma.todo.findFirstOrThrow({
        where: { id: Number(id)}
    })
}catch (err: any) {
    console.log(err)
    if (err.code === 'P2025'){
        throw Boom.notFound('Post not found')
        
    } else {
        throw err
    }
}
}





