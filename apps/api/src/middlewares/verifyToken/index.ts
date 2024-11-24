import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwt_secret = process.env.JWT_SECRET as string
export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        const token = authorization?.split(' ')[1]
        console.log(token)

        if (!token) throw { msg: 'Harap login terlebih dahulu', status: 406 }

        const tokenVerify: any = await jwt.verify(token, jwt_secret)
        console.log(tokenVerify)

        req.body.userId = tokenVerify?.data?.id
        console.log(req.body, "<<< masuk ga")

    } catch (error) {
        next(error)
    }
}