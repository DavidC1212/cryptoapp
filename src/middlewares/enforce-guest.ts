import { NextFunction, Request, Response } from "express";
import createHttpError, {Unauthorized} from "http-errors";

export default function enforceGuest(req: Request, res: Response, next: NextFunction){
    if (req.user) return res.redirect('/users/dashboard')
    return next();
}