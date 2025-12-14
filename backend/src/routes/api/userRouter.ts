import { Router } from "express";
import { getProfile } from '../../controllers/userController'

const router = Router()

router.route('/')
    .get(getProfile)

export default router