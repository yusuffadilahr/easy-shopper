import prisma from "@/connection"
import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import { phoneNumberValidation } from "@/middlewares/validator/phoneNumberValidator"
import fs, { readFileSync } from 'fs'
import { compile } from "handlebars"
import { transport } from "@/utils/transporter"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwt_secret = process.env.JWT_SECRET as string

interface IRegisterBody {
    name: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
}

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, address, phoneNumber }: IRegisterBody = req.body

        const findUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { phoneNumber }
                ]
            }
        })

        const verifyEmailbyDateNow = Date.now().toString()
        const verifyEmailCode = verifyEmailbyDateNow.slice(6, verifyEmailbyDateNow.length - 1)

        if (!phoneNumberValidation(phoneNumber)) throw { msg: 'Masukan nomor dengan benar', status: 404 }
        if (!email.includes('@')) throw { msg: 'Harap masukan email dengan benar', status: 406 }
        if (findUser) throw { msg: 'Email atau nomor telepon sudah terdaftar', status: 400 }
        if (password.length < 8) throw { msg: 'Harap masukan password sebanyak 8 karakter', status: 406 }

        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const dataUser = await prisma.user.create({
            data: {
                name,
                email,
                address,
                phoneNumber,
                password: hashPassword,
                role: 'USER',
                profilePicture: 'https://i.pinimg.com/1200x/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg',
                isVerify: false,
                verifyEmailCode: verifyEmailCode
            }
        })

        const token = await jwt.sign({ data: { id: dataUser?.id, role: dataUser?.role } }, jwt_secret, {
            expiresIn: '1d'
        })

        console.log(token)

        const emailVerify = readFileSync('./src/public/sendMail/verifyEmailRegister.html', 'utf-8')
        let compiledEmail: any = compile(emailVerify)
        compiledEmail = compiledEmail({
            verification_link: `http://localhost:3000/verify-email-user/${token}`,
            name,
            website: 'http://localhost:3000' // tahap development dan production harus diganti
        })

        await transport.sendMail({
            to: email,
            subject: 'Verify your email',
            html: compiledEmail
        })

        res.status(201).json({
            error: false,
            message: 'Berhasil membuat akun, silahkan masuk',
            data: { name, email }
        })
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const findUser = await prisma.user.findFirst({
            where: { email }
        })

        if (!findUser) throw { msg: 'User belum terdaftar', status: 406 }

        const isCompare = await bcrypt.compare(password, findUser?.password)
        if (!isCompare) throw { msg: 'Password tidak valid, harap coba lagi', status: 400 }

        const token = await jwt.sign({ data: { id: findUser?.id, role: findUser?.role } }, jwt_secret, { expiresIn: '1d' })

        res.status(200).json({
            error: false,
            message: 'Berhasil login',
            data: {
                token,
                role: findUser?.role,
                name: findUser?.name,
                email: findUser?.email
            }
        })

    } catch (error) {
        next(error)
    }
}

export const keepAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body
        
    } catch (error) {
        next(error)
    }
}