import { Request, Response, NextFunction } from "express"

export const verifyRoles = (...allowedRolles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.roles) {
            res.sendStatus(401)
            return
        }

        const rolesArray = [...allowedRolles]

        const result = req.roles.map(role => rolesArray.includes(role)).find(value => value === true)
        if (!result) {
            res.sendStatus(401)
            return
        }

        next()
    }
}