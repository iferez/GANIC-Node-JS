/* eslint-disable @typescript-eslint/restrict-template-expressions */
import 'dotenv/config'
import express from 'express'
import indexRouter from './routes/index.routes'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const port: string | undefined = process.env.PORT
app.use(express.json())
app.use('/static', express.static('public/images'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: '*' }))

app.use('/api', indexRouter)

app.listen(port, () => { console.log(`Server is listening on port $ ${port}`) })
