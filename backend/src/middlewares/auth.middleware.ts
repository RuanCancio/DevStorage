import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

interface TokenPayload {
    userId: string,
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader) {
           return res.status(401).json({error: "Token missing"})
        }

        const parts = authHeader.split(" ")

        if(parts.length !== 2) {
            return res.status(401).json({error: "Token Error"})
        }

        const [, token] = parts

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in .env");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) as TokenPayload

        (req as any).userId = decoded.userId

        return next()

    } catch {
        return res.status(400).json({error: "Invalid token"})
    }
}
