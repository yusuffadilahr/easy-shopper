import * as Yup from 'yup'

export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .email('Email tidak valid!')
        .required('Email tidak boleh kosong!'),
        
    password: Yup.string()
        .min(8, 'Password minimal 8 karakter')
        .matches(/[a-z]/, 'Password harus mengandung huruf kecil')
        .matches(/[A-Z]/, 'Password harus mengandung huruf besar')
        .matches(/[0-9]/, 'Password harus mengandung angka')
        .matches(/[@$!%*?&]/, 'Password harus mengandung karakter')
        .required('Password tidak boleh kosong!')
});