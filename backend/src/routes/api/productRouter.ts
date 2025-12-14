import { Router } from "express";
import { createProduct, updateProduct, deleteProduct } from '../../controllers/productController'
import { validateProductSchema } from '../../middleware/validation/validateProductSchema'
import { verifyRoles } from "../../middleware/verifyRoles";
import { RolesList } from "../../config/rollesList";

const router = Router()

router.route('/')
    .post(verifyRoles(RolesList.Admin), validateProductSchema, createProduct)
    .put(verifyRoles(RolesList.Admin), validateProductSchema, updateProduct)
    .delete(verifyRoles(RolesList.Admin), deleteProduct)

export default router