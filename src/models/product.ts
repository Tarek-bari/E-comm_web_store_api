import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    images: {
        type: [String],
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        optional: true
    },
    sizes: {
        type: [String],
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discount: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [String],
        default: []
    }
})

export default model('Product', productSchema)