import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    image: {
        type: String,
        optional: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        optional: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        Customer: Number,
        Seller: Number,
        Admin: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    refreshToken: [String]
})

export default model('User', userSchema)