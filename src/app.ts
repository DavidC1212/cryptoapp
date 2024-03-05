import  express from "express";
import userRouter from './routers/users';
import path from 'path';
import config from "config";

const server = express()
const port = config.get<number>('app.port')

server.set('views', path.resolve(__dirname,  'views'))
server.set('view engine', 'ejs')
server.use('/users', userRouter); 

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})