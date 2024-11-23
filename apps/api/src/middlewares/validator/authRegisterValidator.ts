import { body } from "express-validator";

export const authRegisterValidation = [
    body(['name', 'email', 'password', 'address', 'phoneNumber']).notEmpty().withMessage('Harap diisi terlebih dahulu!'),
    body('name').isString().escape(),
    body('email').isString().escape(),
    body('password').isString().escape(),
    body('address').isString().escape(),
    body('phoneNumber').isString().escape()
]