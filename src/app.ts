import  express, { Router } from "express";
import userRouter from './routers/users';
import path from 'path';
import config from "config";
import errorHandler from "./middlewares/error/error-handler";

const server = express()
const port = config.get<number>('app.port')

// general middlewares
server.use(express.urlencoded())

// views setup
server.set('views', path.resolve(__dirname,  'views'))
server.set('view engine', 'ejs')

server.use('/users', userRouter);

// error middlewares
server.use(errorHandler) 

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})