import { checkSchema } from "express-validator"

interface OrderSchema {
    [key: string]: {}
}

export const order_schema: OrderSchema = {
    firstName: {
        errorMessage: 'please enter a valid first name',
        isLength: {
            options: { min: 3 },
            errorMessage: 'first name must be at least 3 characters long'
        },
        trim: true,
        isString: true,
        optional: true
    },
    lastName: {
        errorMessage: 'please enter a valid last name',
        isLength: {
            options: { min: 3 },
            errorMessage: 'last name must be at least 3 characters long'
        },
        trim: true,
        isString: true,
        optional: true
    },
    color: {
        errorMessage: 'please enter a valid color',
        isLength: {
            options: { min: 3 },
            errorMessage: 'color must be at least 3 characters long'
        },
        trim: true,
        isString: true,
        optional: true
    },
    size: {
        errorMessage: 'please enter a valid size',
        isLength: {
            options: { min: 1 },
            errorMessage: 'size must be at least 1 characters long'
        },
        trim: true,
        isString: true,
        optional: true,
    },
    phone: {
        isMobilePhone: {
            options: ['ar-DZ'],
            errorMessage: 'please enter a valid phone number'
        },
        isString: true,
        trim: true,
        optional: true
    },
    state: {
        errorMessage: 'please enter a valid state',
        isLength: {
            options: { min: 4 },
            errorMessage: 'state must be at least 3 characters long'
        },
        trim: true,
        isString: true,
        optional: true
    },
    address: {
        errorMessage: 'please enter a valid address',
        isLength: {
            options: { min: 3 },
            errorMessage: 'color must be at least 3 characters long'
        },
        trim: true,
        isString: true,
        optional: true
    },
    deliveryPrice: {
        errorMessage: 'Please enter a valid delivry price',
        isNumeric: true,
        optional: true
    },
    status: {
        isIn: {
            options: [['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Returned']],
            errorMessage: 'Invalid order status'
        },
        optional: true
    }
}