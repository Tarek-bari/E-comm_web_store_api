import Order from '../models/order'
import { Request, Response } from "express";


// Also for filltering orders of specific product
export const getAllOrders = async (req: Request, res: Response) => {

    if (req?.query?.productId) {
        const filterOrders = await Order.find({ productId: req.query.productId })

        if (req.query.productId.length !== 24) {
            res.status(400).json({ message: 'Invalid productId' })
            return
        }

        if (!filterOrders || filterOrders.length === 0) {
            res.status(204).json({ message: `Theres no orders for product you looking for` })
            return
        }

        res.json(filterOrders)
        return
    }

    const orders = await Order.find()

    if (!orders || orders.length === 0) {
        res.status(204).json({ message: "No orders found" })
        return
    }
    res.json(orders)
}

// route for admins and sellers to converts order status
export const changeOrderStatus = async (req: Request, res: Response) => {
    const { orderId, status } = req.body

    if (!orderId || !status) {
        res.status(400).json({ message: 'Odrer id and order status are required' })
        return
    }

    if (orderId.length !== 24) {
        res.status(400).json({ message: 'Invalid oreder id' })
        return
    }

    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        res.status(204).json({ message: 'No order matches id you provided' })
        return
    }

    try {
        order.status = status
        const result = await order.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }

}

export const createOrder = async (req: Request, res: Response) => {
    const { productId, productName, firstName, lastName, color, size, phone, state, address, deliveryPrice } = req.body
    if (!productId || !productName || !firstName || !lastName || !color || !size || !phone || !state || !address || !deliveryPrice) {
        res.status(400).json({ message: "Please fill in all required fields" })
        return
    }

    try {
        const newOrder = await Order.create({
            productId,
            customerId: req.id,
            productName,
            firstName,
            lastName,
            color,
            size,
            phone,
            state,
            address,
            deliveryPrice
        })

        res.status(201).json(newOrder)

    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    if (!req?.body?.id) {
        res.status(400).json({ message: "Order id required" })
        return
    }

    if (req?.body?.id.length !== 24) {
        res.status(400).json({ message: "Invalid order id" })
        return
    }

    const order = await Order.findOne({ _id: req.body.id })
    if (!order) {
        res.status(204).json({ message: `No order matches ID ${req.params.id}` })
        return
    }

    if (req.body?.productId) order.productId = req.body.productId
    if (req.body?.productName) order.productName = req.body.productName
    if (req.body?.firstName) order.firstName = req.body.firstName
    if (req.body?.lastName) order.lastName = req.body.lastName
    if (req.body?.color) order.color = req.body.color
    if (req.body?.size) order.size = req.body.size
    if (req.body?.phone) order.phone = req.body.phone
    if (req.body?.state) order.state = req.body.state
    if (req.body?.address) order.address = req.body.address
    if (req.body?.deliveryPrice) order.deliveryPrice = req.body.deliveryPrice

    try {
        order.status = 'Pending'
        const result = await order.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    if (!req?.body?.id) {
        res.status(400).json({ message: "Order id required" })
        return
    }

    if (req?.body?.id.length !== 24) {
        res.status(400).json({ message: "Invalid order id" })
        return
    }

    const order = await Order.findOne({ _id: req.body.id })

    if (!order) {
        res.status(204).json({ message: `No order matches ID ${req.params.id}` })
        return
    }

    try {
        const result = await order.deleteOne()
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
        res.status(400).json({ message: "Order id required" })
        return
    }

    if (req?.params?.id.length !== 24) {
        res.status(400).json({ message: "Invalid order id" })
        return
    }

    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
        res.status(204).json({ message: `No order matches ID ${req.params.id}` })
        return
    }

    res.json(order)
}