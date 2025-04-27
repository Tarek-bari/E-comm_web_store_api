import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { requestsLogger } from './middleware/requestesLogger'
import { corsOptions } from './config/corsOptions'
import { errorHandler } from './middleware/errorHandler'
import cookieParser from 'cookie-parser'
import { connection } from 'mongoose'
import { dbConnect } from './config/dbConnect'
import { verifyJwt } from './middleware/verifyJwt'
import { authLimiter, passwordLimiter, authenticatedLimiter, publicLimiter } from './middleware/rateLimiting'
import rootRouter from './routes/root'
import registerRouter from './routes/authentication/registerRouter'
import authRouter from './routes/authentication/authRouter'
import refreshTokenRouter from './routes/authentication/refreshTokenRouter'
import logoutRouter from './routes/authentication/logoutRouter'
import productPublicRouter from './routes/api/publicProductRouter'
import productRouter from './routes/api/productRouter'
import orderRouter from './routes/api/orderRouter'
import userRouter from './routes/api/userRouter'



const port = process.env.PORT

const app = express();

dbConnect()

app.use(requestsLogger)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

// public routes
app.use('/public/product', productPublicRouter)
// reset password route
// ....................
// auth routes
app.use('/', rootRouter)
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/refresh', refreshTokenRouter)
app.use('/logout', logoutRouter)
// authenticated routes
app.use(verifyJwt)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)


app.all('*', (req: Request, res: Response) => {
    res.status(404).json("404 Not Found")
})

app.use(errorHandler)

connection.once('open', () => {
    console.log('cennected to database')
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})