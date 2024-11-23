import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const errorHandling = (req: Request, res: Response, next: NextFunction) => {
    try {
        const error = validationResult(req)

        if (error.isEmpty() == false) {
            throw { msg: error.array()[0]?.msg, status: 406 }
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}