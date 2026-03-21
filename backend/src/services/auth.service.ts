import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { prisma } from "../database/prisma"

export class AuthService {

    async register(email: string, password: string) {
        const userExists = prisma.user.findUnique({
            where: { email }
        })

        if(!userExists) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        return {id: user.id, email: user.email}

    }

    async login(email: string, password: string) {
        const userVerify = await prisma.user.findUnique({
            where: { email }
        })

        if(!userVerify) {
            throw new Error("Invalid credentials")
        }

        const validPassword = await bcrypt.compare(password, userVerify.password)

        if(!validPassword) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign(
            { userId: userVerify.id },
           "secret",
           { expiresIn: "1d"}
        )

        return { token }
    }
}