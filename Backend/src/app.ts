import 'dotenv/config'
import express from 'express'
import indexRouter from './routes/index.routes'
import cors from 'cors'

const app = express()
const port: string | undefined = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: '*' }))

app.use('/', indexRouter)

app.listen(port, () => { console.log(`Server is listening on port $ ${port}`) })
