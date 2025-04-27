import { Request, Response } from 'express'
import User from '../../models/user'


export const logoutHandler = async (req: Request, res: Response) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        res.sendStatus(204)
        return
    }

    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ "refreshToken": refreshToken })

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })
        res.sendStatus(204)
        return
    }

    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken)
    await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
}
