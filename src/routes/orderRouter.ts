import express from 'express'
import orderController from '../controllers/orderController'
import authMiddleware from '../middlewares/authMiddleware'

export const orderRouter = express.Router()

// Criar uma encomenda

orderRouter.post('/orders', authMiddleware, orderController.create)

// Listar encomendas do arquivadas

orderRouter.get(`/orders-filed/:id`, authMiddleware, orderController.filed)

// Atualiza encomendas

orderRouter.put(`/orders/:id`, authMiddleware, orderController.update)

// Listar encomendas do usuário

orderRouter.get(`/orders/:id`, authMiddleware, orderController.show)

// Deletar uma encomendas

orderRouter.delete(`/orders/:id`, authMiddleware, orderController.delete)

// Deletar todas as encomendas arquivadas

orderRouter.delete(`/orders/:id`, authMiddleware, orderController.deleteAll)
