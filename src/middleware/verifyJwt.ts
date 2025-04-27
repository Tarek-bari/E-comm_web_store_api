import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'


declare module 'express-serve-static-core' {
    interface Request {
        id?: string;
        roles?: number[];
    }
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        res.sendStatus(401)
        return
    }

    const token = authHeader.split(' ')[1]

    verify(
        token,
        process.env.TOKEN_SECRET as string,
        (err, decoded) => {
            if (err) {
                res.sendStatus(403) // forbiden
                return
            }

            const payload = decoded as { UserData: { id: string, roles: number[] } }

            req.id = payload.UserData.id
            req.roles = payload.UserData.roles

            console.log(req.id)
            console.log(req.roles)

            next()
        }
    )
}