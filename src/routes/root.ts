import { Request, Response, Router } from 'express'
const router = Router()


export default router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ "message": "Welcome to Mohammed Bari E-commerce web store Api" })
}) 