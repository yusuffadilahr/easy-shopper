import { createTransport } from "nodemailer";


export const transport = createTransport({
    service: 'gmail',
    auth: {
        user: 'yusuffadilah58@gmail.com',
        pass: 'obwtawkkxkxxwmbo'
    },
    tls: {
        rejectUnauthorized: false
    }
})