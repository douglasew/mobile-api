import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { transport } from '../configs/mail'
import { prisma } from '../prisma'

class userController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, status, photo, password } = req.body
    const passwordHash = await hash(password, 8)

    try {
      const users = await prisma.user.create({
        data: {
          name,
          email,
          status,
          photo,
          password: passwordHash,
        },
      })

      await transport.sendMail({
        from: 'Equipe Dev <oi@devi.com>',
        to: `<${email}>`,
        subject: 'Novo Usuario',
        html: [
          `<div style="text-align: center; font-size: 20px;font-family: sans-serif">`,
          `<p style="margin-top: 15px">Nome Usuario Criado</p>`,
          `<p>Nome do usuario: <strong>${name}</strong></p>`,
          `<p>Status do usuario: <strong>${status}</strong></p>`,
          `<img src="${photo}" width="300" height="300">`,
          `</div>`,
        ].join('\n'),
      })

      return res.status(201).json(users)
    } catch (error) {
      return res.json({
        error:
          'Someone already has this email address. Try using another email',
      })
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const users = await prisma.user.findMany()

    return res.json(users)
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const users = await prisma.user.findUnique({
        where: { id: String(id) },
      })

      return res.json(users)
    } catch (error) {
      return res.json({ error: 'User does not exist' })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, status, photo, password } = req.body
    const passwordHash = await hash(password, 8)

    try {
      const usersUpdate = await prisma.user.update({
        where: { id: String(id) },
        data: {
          name,
          email,
          status,
          photo,
          password: passwordHash,
        },
      })

      return res.json(usersUpdate)
    } catch (error) {
      return res.status(404).json({ error: 'User does not exist' })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const users = await prisma.user.delete({
      where: {
        id: String(id),
      },
    })

    return res.json(users)
  }
}

export default new userController()
