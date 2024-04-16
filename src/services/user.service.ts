/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import prisma from '../libs/prisma'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Boom  from '@hapi/boom'
import { z } from 'zod'
import { createUserDtoBody } from '../validators/create-user.validator'

export async function login(email: string, password: string) {
      const user = await prisma.user.findFirstOrThrow({ where: { email } })

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        // Password does not match
        // If you want to throw a http error, you can. This is throw internal server error
        throw Boom.forbidden('Password is not correct')
    }

    // Generate a token
    const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        'random-secret',
        {
            expiresIn: '1h',
        }
    )

    // Return the token to the client
    return { success: true, token }
    
}

// Refresh token - long lived token
// Access token - short lived token expires in 5 minutes


export const create = async (user: z.infer<typeof createUserDtoBody>) => {
  const {email, password, isAdmin} = user
    try{
      return await prisma.user.create({
        data: {
          email: user.email,
          password: await bcrypt.hash(user.password as string,10),
          isAdmin

        },
      })
    } catch(err:any) {
      console.log(err)
      if(err.code ==='P2002') {
        //throw new Error 
        throw Boom.notFound('Email Unique contraint failed')
      }else {
        throw err
      }
    }
  }

  export const remove = async (userId: any) =>{
    try{
        return  await prisma.user.delete({where: {id:userId}})
  
    }catch(err:any){
    console.log(err)
    if(err.code === 'P2003'){
    throw Boom.notFound("Todos delete garnu hola pahila ")
  }else{
  throw err
  }
  }
  }