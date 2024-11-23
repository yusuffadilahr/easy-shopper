import * as Yup from 'yup'

export const registerValidation = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Nama hanya boleh huruf dan spasi')
        .min(3, 'Nama minimal 3 karakter').max(25, 'Nama terlalu panjang')
        .required('Nama tidak boleh kosong!'),
        
    email: Yup.string()
        .email('Email tidak valid!')
        .required('Email tidak boleh kosong!'),
        
    password: Yup.string()
        .min(8, 'Password minimal 8 karakter')
        .matches(/[a-z]/, 'Password harus mengandung huruf kecil')
        .matches(/[A-Z]/, 'Password harus mengandung huruf besar')
        .matches(/[0-9]/, 'Password harus mengandung angka')
        .matches(/[@$!%*?&]/, 'Password harus mengandung karakter')
        .required('Password tidak boleh kosong!'),
        
    phoneNumber: Yup.string()
        .matches(/^\d{10,15}$/, 'Nomor telepon minimal 10 - 15 digit')
        .required('Nomor telepon tidak boleh kosong!'),
        
    address: Yup.string()
        .min(10, 'Alamat harus minimal 10 karakter')
        .required('Alamat tidak boleh kosong!'),
});