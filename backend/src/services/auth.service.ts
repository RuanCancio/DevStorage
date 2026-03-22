import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { prisma } from "../database/prisma"
import dotenv from "dotenv"

dotenv.config()

export class AuthService {

    async register(email: string, password: string) {
        const userExists = prisma.user.findUnique({
            where: { email }
        })

        if (!userExists) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        return { id: user.id, email: user.email }

    }

    async login(email: string, password: string) {
        const userVerify = await prisma.user.findUnique({
            where: { email }
        })

        if (!userVerify) {
            throw new Error("Invalid credentials")
        }

        const validPassword = await bcrypt.compare(password, userVerify.password)

        if (!validPassword) {
            throw new Error("Invalid credentials")
        }

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in .env");
        }

        const token = jwt.sign(
            { userId: userVerify.id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )

        return { token }
    }
}