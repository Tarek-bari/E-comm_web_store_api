import { Request, Response, NextFunction, RequestHandler } from 'express'
import { register_schema } from '../../schema/registerSchema'
import { validationResult, checkSchema } from 'express-validator'


export const validateRegisterSchema: RequestHandler[] = [

    // ...checkSchema(register_schema),
    (req: Request, res: Response, next: NextFunction) => checkSchema(register_schema).run(req).then(() => next()).catch((next)),

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

