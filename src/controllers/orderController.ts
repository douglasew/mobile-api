import { Request, Response } from 'express'
import { prisma } from '../prisma'

class orderController {
  async create(req: Request, res: Response): Promise<Response> {
    const { number, reminder, userId, categoryId, status } = req.body

    try {
      const orders = await prisma.order.create({
        data: {
          number,
          reminder,
          status,
          userId,
          categoryId,
        },
      })

      return res.status(201).json(orders)
    } catch (error) {
      return res.json({ error: 'Invalid fields' })
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const orders = await prisma.order.findMany({
      where: { userId: String(id), status: true },
    })

    return res.json(orders)
  }

  async filed(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const orders = await prisma.order.findMany({
      where: { userId: String(id), status: false },
    })

    return res.json(orders)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { number, reminder, categoryId, status, userId } = req.body

    const orders = await prisma.order.update({
      where: { id: String(id) },
      data: { number, reminder, status, categoryId, userId },
    })

    return res.json(orders)
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const orders = await prisma.order.delete({
      where: {
        id: String(id),
      },
    })

    return res.json(orders)
  }

  async deleteAll(req: Request, res: Response): Promise<Response> {
    const orders = await prisma.order.deleteMany({
      where: { status: false },
    })

    return res.status(200).json(orders)
  }
}

export default new orderController()
