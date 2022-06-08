require('dotenv').config()

const auth = {
  secret: process.env.AUTH_SECRET,
  expireIn: process.env.AUTH_EXPIREIN,
}

export = auth
