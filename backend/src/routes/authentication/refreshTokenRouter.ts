import { Router } from 'express'
import { refreshTokenHandler } from '../../controllers/authentication/refreshTokenController'


const router = Router()

export default router
    .get('/', refreshTokenHandler)