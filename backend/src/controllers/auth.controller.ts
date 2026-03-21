import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"

const authService = new AuthService()

export class authController {
    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await authService.register(email, password)

            return res.status(201).json(user)
        }
        catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const result = await authService.login(email, password)

            return res.status(200).json(result)
        }
        catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}