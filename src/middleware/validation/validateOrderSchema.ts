import { Request, Response, NextFunction, RequestHandler } from 'express'
import { order_schema } from '../../schema/orderSchema'
import { validationResult, checkSchema } from 'express-validator'


export const validateOrderSchema: RequestHandler[] = [

    // ...checkSchema(productSchema),
    (req: Request, res: Response, next: NextFunction) => checkSchema(order_schema).run(req).then(() => next()).catch((next)),

    (req: Request, res: Response, next: NextFunction) => {


        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg)
            res.status(400).json({ message: errorMessages })
            return
        }
        next()
    }


]

