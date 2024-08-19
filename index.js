process.on("uncaughtException", () =>{
    console.log('error',err)
})

import express from 'express'
import cors from 'cors'
import bookRouter from './src/modules/book/book.routes.js'
import { dbconn } from './database/dbConnection.js'
import authorRouter from './src/modules/author/author.routes.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './utils/appError.js'
import { Author } from './database/models/author.model.js'
import jwt from 'jsonwebtoken'

const app = express()
const port =process.env.PORT || 3000
app.use(cors())
dbconn()

app.use(express.json())
app.use('/auth', authorRouter)
app.use('/books', bookRouter)
app.use('/authors', authorRouter)

app.get('/verify/:token', async (req,res,next) =>{
    jwt.verify(req.params.token, 'menna', async (err, payload) =>{
        if(err) return next(new AppError(err, 401))
        await Author.findOneAndUpdate({email:payload.email},{confirmEmail:true})
        res.json({message:"success", email:payload.email})
    })
})

app.use('*', (req, res, next) =>{
    next (new AppError (`route is not found ${req.originalUrl}`,404))
})

app.use(globalError)

process.on("unhandledRejection", (err) =>{
    console.log("error", err)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))