import { rateLimit } from 'express-rate-limit'

// public limits for broews products
export const publicLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 150,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, slow down!'
})

// for reset password
export const passwordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many password reset requests, please try after 1 hour'
})

// Also changable for login
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts, please try after 15 minutes'
})

// changable <user actions...etc>
export const authenticatedLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 750,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please wait!'
})