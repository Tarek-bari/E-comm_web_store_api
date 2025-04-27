import { Request, Response } from 'express'
import User from '../../models/user'
import { hash } from 'bcrypt'


export const createNewCustomer = async (req: Request, res: Response): Promise<void> => {
    const { image, userName, email, phone, password } = req.body
    if (!userName || !email || !password) {
        res.status(400).json({ 'message': 'Please fill in all fields' })
        return
    }

    const duplicateUserNameCheck = await User.findOne({ userName: userName })
    const duplicateEmailCheck = await User.findOne({ email: email })

    if (duplicateUserNameCheck) {
        res.status(409).json({ 'message': 'userName already exists' })
        return
    }

    if (duplicateEmailCheck) {
        res.status(409).json({ 'message': 'email already exists' })
        return
    }

    try {
        const hashPassword = await hash(password, 10)

        await User.create({
            image: image ? image : null,
            userName: userName,
            email: email,
            phone: phone ? phone : null,
            password: hashPassword,
            roles: { Customer: 5001 }
        })

        res.status(201).json({ 'success': `New user ${userName} created` })

    } catch (err) {
        res.status(500).json({ 'error': (err as Error).message })
    }
}

export const createNewAdmin = async (req: Request, res: Response): Promise<void> => {
    const { image, userName, email, phone, password } = req.body
    if (!userName || !email || !password) {
        res.status(400).json({ 'message': 'Please fill in all fields' })
        return
    }

    const duplicateUserNameCheck = await User.findOne({ userName: userName })
    const duplicateEmailCheck = await User.findOne({ email: email })

    if (duplicateUserNameCheck) {
        res.status(409).json({ 'message': 'userName already exists' })
        return
    }

    if (duplicateEmailCheck) {
        res.status(409).json({ 'message': 'email already exists' })
        return
    }

    try {
        const hashPassword = await hash(password, 10)

        await User.create({
            image: image ? image : null,
            userName: userName,
            email: email,
            phone: phone ? phone : null,
            password: hashPassword,
            roles: { Admin: 2021 }
        })

        res.status(201).json({ 'success': `New admin ${userName} created` })

    } catch (err) {
        res.status(500).json({ 'error': (err as Error).message })
    }
}