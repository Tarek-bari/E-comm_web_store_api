import { Router } from "express";
import { getAllProducts, getProductById } from '../../controllers/productController'

const router = Router()

router
    .get('/', getAllProducts)
    .get('/:id', getProductById)

export default router