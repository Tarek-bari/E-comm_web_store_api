import { Router } from 'express'
import { logoutHandler } from '../../controllers/authentication/logoutControoler'


const router = Router()

export default router
    .get('/', logoutHandler)