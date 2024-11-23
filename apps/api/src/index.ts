import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './routers'
import cors from 'cors'
import { IError } from './types/centralError'
import { asciiText } from './utils/ascii'
import { dbConnect } from './connection'

dotenv.config()
const app: Express = express()
app.use(express.json())

const port: string = process.env.PORT || ''

const corsOption = {
    origin: '*',
    credentials: true
}

app.use(cors(corsOption))
app.use('/api', router)

app.use('/3000', (req: Request, res: Response, next: NextFunction) => {
    res.send(`<h1>Welcome on Port ${port}</h1>`)
})

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    res.status(err?.status || 500).json({
        error: false,
        message: err?.msg || 'Ada kesalahan server!',
        data: {}
    })
})

dbConnect()

app.listen(port, () => {
    console.log('On PORT 5000')
})