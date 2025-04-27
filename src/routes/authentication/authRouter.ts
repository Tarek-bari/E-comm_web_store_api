import { Router } from 'express'
import { loginHandler } from '../../controllers/authentication/authController'


const router = Router()

export default router
    .post('/', loginHandler)