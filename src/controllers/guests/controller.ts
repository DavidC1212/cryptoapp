import { NextFunction, Response, Request } from "express";

export function welcome(req: Request, res:Response, next: NextFunction){
    res.render('guests/welcome')
}