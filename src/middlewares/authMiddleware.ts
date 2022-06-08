import { Request, Response } from 'express'
import auth from '../configs/auth'

const jwt = require('jsonwebtoken')

const { promisify } = require('util')
const authMiddleware = async (req: Request, res: Response, next: any) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: 'Token not informed',
    })
  }

  const [bearer, token] = authorization.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret)

    if (!decoded) {
      return res.status(401).json({
        error: true,
        code: 130,
        message: 'Token is expired!',
      })
    } else {
      next()
    }
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: 'Token does not exist!',
    })
  }
}

export = authMiddleware
