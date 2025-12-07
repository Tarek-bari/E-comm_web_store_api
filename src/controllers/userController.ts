import { Request, Response } from 'express'
import User from '../models/user'



export const getProfile = async (req: Request, res: Response) => {
    const userId = req?.id

    if (userId) {
        const userData = await User.findOne({ _id: userId })

        // let roles: string[] = []

        // let roleMap = userData && userData.roles ? new Map(Object.entries(userData?.roles)) : []

        // for (const [key, value] of roleMap) {
        //     if (value !== null) {
        //         roles.push(key)
        //     }
        // }

        const role = userData?.roles ? Object.keys(userData?.roles) : []

        const profile = {
            picture: userData?.image,
            userName: userData?.userName,
            email: userData?.email,
            phone: userData?.phone,
            role: role
        }
        res.json(profile)
    } else {
        res.sendStatus(401)
    }
}