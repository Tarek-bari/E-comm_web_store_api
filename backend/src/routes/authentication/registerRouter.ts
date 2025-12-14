import { Router } from 'express'
import { createNewAdmin, createNewCustomer } from '../../controllers/authentication/registerController'
import { validateRegisterSchema } from '../../middleware/validation/validateRegisterSchema'

const router = Router()

export default router
    .post('/', validateRegisterSchema, createNewCustomer)
    .post('/admin', validateRegisterSchema, createNewAdmin)