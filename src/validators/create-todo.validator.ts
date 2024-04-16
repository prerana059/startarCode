import { z } from 'zod'


export const createTodoSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'name is required',
        }),
        id: z.number().optional()
    }).strict(),
})

export const updateTodoSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'name is required',
        }),
        id: z.number().optional()
    }).strict(),
})

export const removeTodoSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Id is required',
        }),
        
    }).strict(),
})

export const isAdminTodoSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'name is required',
        }),
        id: z.number().optional()
    }).strict(),
})