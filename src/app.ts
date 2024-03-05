import  express from "express";
import userRouter from './routers/users';
import path from 'path';

const server = express()
const PORT = 8080;

server.set('views', path.resolve(__dirname,  'views'))
server.set('view engine', 'ejs')
server.use('/users', userRouter); 

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})