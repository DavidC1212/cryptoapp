import { NextFunction, Request, Response } from "express";
import createHttpError, {Unauthorized} from "http-errors";

export default function enforceAuth(req: Request, res: Response, next: NextFunction){
    if (!req.user) return next(createHttpError(Unauthorized()));
    return next();
}