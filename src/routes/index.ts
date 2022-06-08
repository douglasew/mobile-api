import express from 'express'
import { orderRouter } from './orderRouter'
import { userRouter } from './userRoutes'

export const routes = express.Router()

routes.use(userRouter)
routes.use(orderRouter)
