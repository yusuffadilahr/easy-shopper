import { dbConnectText } from "@/utils/ascii";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const dbConnect = async () => {
    try {
        await prisma.$connect()
        console.log(dbConnectText)
    } catch (error) {
        console.log(error)
        console.log('DB Disconnect')
    }
}


export default prisma