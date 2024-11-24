import { keepAuthUser, userLogin, userRegister } from "@/controllers/user.controller";
import { authLoginValidation } from "@/middlewares/validator/authLoginValidator";
import { authRegisterValidation } from "@/middlewares/validator/authRegisterValidator";
import { errorHandling } from "@/middlewares/validator/errorHandling";
import { tokenValidation } from "@/middlewares/verifyToken";
import { Router } from "express";

const authRouter = Router()
authRouter.post('/register', authRegisterValidation, errorHandling, userRegister)
authRouter.post('/login', authLoginValidation, errorHandling, userLogin)
authRouter.get('/user-display', tokenValidation, keepAuthUser)

export default authRouter