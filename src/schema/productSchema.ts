interface ProductSchema {
    [key: string]: {}
}

export const product_schema: ProductSchema = {
    images: {
        errorMessage: 'please enter a valid images URLs',
        isArray: true,
        custom: {
            options: (imgs: string[]) => {
                return imgs.every((img: string) => {
                    return typeof img === 'string' && img.length > 0
                })
            }
        },
        trim: true,
        optional: true
    },
    productName: {
        errorMessage: 'please enter a valid title',
        isLength: {
            options: { min: 3 },
            errorMessage: 'title must be at least 3 characters long'
        },
        trim: true,
        isString: true,
        optional: true
    },
    price: {
        errorMessage: 'please enter a valid price',
        isNumeric: true,
        optional: true,
    },
    description: {
        isString: true,
        trim: true,
        optional: true
    },
    sizes: {
        errorMessage: 'please enter a valid sizes',
        isArray: true,
        custom: {
            options: (value: string[]) => {
                return value.every((v: string) => {
                    return typeof v === 'string' && v.length > 0
                })
            }
        },
        optional: true
    },
    colors: {
        errorMessage: 'please enter valid colors',
        isArray: true,
        custom: {
            options: (value: string[]) => {
                return value.every((v: string) => {
                    return typeof v === 'string' && v.length > 0
                })
            }
        },
        optional: true
    },
    category: {
        errorMessage: 'please enter a valid category',
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'category must be at least 3 characters long'
        },
        isString: true,
        optional: true
    },
    discount: {
        isNumeric: true,
        optional: true
    }
}
