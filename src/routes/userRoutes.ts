import express from 'express'
import loginController from '../controllers/loginController'
import userController from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'

export const userRouter = express.Router()

// Login na aplicação

userRouter.post('/login', loginController.index)

// Criar um usuário

userRouter.post('/users', userController.create)

// Buscar todos os usuários

userRouter.get('/users', authMiddleware, userController.index)

// Buscar um usuário pelo ID

userRouter.get(`/users/:id`, authMiddleware, userController.show)

// Atualizar um usuário

userRouter.put(`/users/:id`, authMiddleware, userController.update)

userRouter.put(`/users/photo/:id`, authMiddleware, userController.updatePhoto)

// Deletar um usuário

userRouter.delete(`/users/:id`, authMiddleware, userController.delete)
