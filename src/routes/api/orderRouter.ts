import { Router } from "express";
import { getAllOrders, createOrder, updateOrder, deleteOrder, getOrderById, changeOrderStatus } from '../../controllers/orderController'
import { validateOrderSchema } from '../../middleware/validation/validateOrderSchema'
import { verifyRoles } from "../../middleware/verifyRoles";
import { RolesList } from "../../config/rollesList";
const router = Router()

router.route('/')
    .get(verifyRoles(RolesList.Admin), getAllOrders)
    .post(verifyRoles(RolesList.Customer), validateOrderSchema, createOrder)
    .put(verifyRoles(RolesList.Customer), validateOrderSchema, updateOrder)
    .delete(verifyRoles(RolesList.Admin, RolesList.Customer), deleteOrder)

router.put('/status', verifyRoles(RolesList.Admin), validateOrderSchema, changeOrderStatus)

router.route('/:id')
    .get(verifyRoles(RolesList.Admin, RolesList.Customer), getOrderById)

export default router