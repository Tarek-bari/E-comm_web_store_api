import Product from "../models/product";
import { Request, Response } from "express";


export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find()
    if (!products || products.length === 0) {
        res.status(204).json({ message: 'No products found' })
        return
    }
    res.json(products)
}


export const createProduct = async (req: Request, res: Response) => {
    const { images, productName, price, description, sizes, colors, category, discount } = req.body
    if (!images || !productName || !price || !sizes || !colors || !category) {
        res.status(400).json({ message: 'Please fill in all required fields' })
        return
    }

    try {
        const newProduct = await Product.create({
            images,
            productName,
            price,
            description: description ? description : null,
            sizes,
            colors,
            category,
            discount: discount ? discount : null
        })

        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    if (!req?.body?.id) {
        res.status(400).json({ message: 'Product id required' })
        return
    }

    if (req?.body?.id.length !== 24) {
        res.status(400).json({ message: 'Invalid product id' })
        return
    }

    const product = await Product.findOne({ _id: req.body.id })
    if (!product) {
        res.status(204).json({ message: `No product matches ID ${req.params.id}` })
        return
    }

    if (req.body?.images) product.images = req.body.images
    if (req.body?.productName) product.productName = req.body.productName
    if (req.body?.price) product.price = req.body.price
    if (req.body?.description) product.description = req.body.description
    if (req.body?.sizes) product.sizes = req.body.sizes
    if (req.body?.colors) product.colors = req.body.colors
    if (req.body?.category) product.category = req.body.category
    if (req.body?.discount) product.discount = req.body.discount

    try {
        const result = await product.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {

    if (!req?.body?.id) {
        res.status(400).json({ 'message': 'Product ID required' })
        return
    }

    if (req?.body?.id.length !== 24) {
        res.status(400).json({ message: 'Invalid product id' })
        return
    }

    const product = await Product.findOne({ _id: req.body.id })
    if (!product) {
        res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
        return
    }

    try {
        const result = await product.deleteOne()
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}


export const getProductById = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
        res.status(400).json({ message: 'Product id required' })
        return
    }

    if (req?.params?.id.length !== 24) {
        res.status(400).json({ message: 'Invalid product id' })
        return
    }

    const product = await Product.findOne({ _id: req.params.id })
    if (!product) {
        res.status(204).json({ message: `No product matches ID ${req.params.id}` })
        return
    }
    res.json(product)
}