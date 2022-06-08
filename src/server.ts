import cors from 'cors'
import express from 'express'
import { routes } from './routes/index'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

const port = 3333

app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`)
})
