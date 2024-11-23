import { userLogin, userRegister } from "@/controllers/user.controller";
import { authLoginValidation } from "@/middlewares/validator/authLoginValidator";
import { authRegisterValidation } from "@/middlewares/validator/authRegisterValidator";
import { errorHandling } from "@/middlewares/validator/errorHandling";
import { Router } from "express";

const authRouter = Router()
authRouter.post('/register', authRegisterValidation, errorHandling, userRegister)
authRouter.post('/login', authLoginValidation, errorHandling, userLogin)

export default authRouter