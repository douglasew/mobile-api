import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import auth from '../configs/auth'
import { prisma } from '../prisma'

const jwt = require('jsonwebtoken')

class loginController {
  async index(req: Request, res: Response) {
    const { email, password } = req.body

    const userExist = await prisma.user.findFirst({
      where: { email },
    })

    if (!userExist) {
      return res.status(404).json({
        error: true,
        message: 'User not found!',
      })
    }

    if (!(await compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        message: 'Wrong password!',
      })
    }

    return res.status(200).json({
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      token: jwt.sign(
        {
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
          status: userExist.status,
        },
        auth.secret,
        {
          expiresIn: auth.expireIn,
        }
      ),
    })
  }
}

export default new loginController()
