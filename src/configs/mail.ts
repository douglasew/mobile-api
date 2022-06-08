import nodemailer from 'nodemailer'

require('dotenv').config()

export const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: 2525,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS,
  },
})
