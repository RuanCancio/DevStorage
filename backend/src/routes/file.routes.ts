import { Router } from "express";
import { upload } from "../config/upload";
import { authMiddleware } from "../middlewares/auth.middleware";
import { prisma } from "../database/prisma"

const router = Router()

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    async (req, res) => {
        const file = req.file

        if(!file) {
            return res.status(400).json({error: "File missing"})
        }

        const userId = (req as any).userId

        const savedFile = await prisma.file.create({
            data: {
                name: file.originalname,
                path: file.originalname,
                userId
            }
        })

        return res.json(savedFile)
    }
)

export default router