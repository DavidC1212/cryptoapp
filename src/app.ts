import  express, { Router } from "express";
import userRouter from './routers/users';
import guestRouter from './routers/guests';
import githubRouter from './routers/github';
import path from 'path';
import config from "config";
import errorHandler from "./middlewares/error/error-handler";
import session  from "express-session";
import auth from "./middlewares/github-auth";

declare global{
    namespace Express{
        interface User{
            id: number;
        }
    }
}

const server = express()
const port = config.get<number>('app.port')

// general middlewares
server.use(express.urlencoded())

// views setup
server.set('views', path.resolve(__dirname,  'views'))
server.set('view engine', 'ejs')

// github auth
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }));

server.use(auth.initialize());
server.use(auth.session());

server.use('/guest', guestRouter)
server.use('/users', userRouter);
server.use('/github', githubRouter)


// error middlewares
server.use(errorHandler) 



server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})