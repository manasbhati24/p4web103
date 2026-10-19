import express from 'express'
import './config/dotenv.js'
import cors from 'cors'
import itemsRouter from './routes/items.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/items', itemsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Among Us Item Customizer API</h1>')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})