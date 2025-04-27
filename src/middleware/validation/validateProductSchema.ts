import { Request, Response, NextFunction, RequestHandler } from 'express'
import { product_schema } from '../../schema/productSchema'
import { validationResult, checkSchema } from 'express-validator'


export const validateProductSchema: RequestHandler[] = [

    // ...checkSchema(productSchema),
    (req: Request, res: Response, next: NextFunction) => checkSchema(product_schema).run(req).then(() => next()).catch((next)),

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

