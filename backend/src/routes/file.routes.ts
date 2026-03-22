import { Router } from "express";
import { upload } from "../config/upload";
import { authMiddleware } from "../middlewares/auth.middleware";
import { prisma } from "../database/prisma"
import fs from "fs"
import path from "path";
const router = Router()

//POST
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
                path: file.filename,
                userId
            }
        })

        return res.json(savedFile)
    }
)

//GET
router.get("/", authMiddleware, async (req, res)=> {
    const userId = req.userId

    const files = await prisma.file.findMany({
        where: {
            userId
        }
    })

    return res.json(files)
})

router.get("/:id/download", authMiddleware, async (req, res)=> {
    const { id } = (req as any).params
    const userId = req.userId

    const file = await prisma.file.findFirst({
        where: {
            id,
            userId
        }
    })

    if (!file) {
        return res.status(404).json({ error: "File not found"})
    }

    const filePath = path.join(process.cwd(), "uploads", file.path)

    if (!fs.existsSync(filePath)) {
        return res.status(404).json( { error: "File not found in disk" } )
    }

    return res.download(filePath, file.name)
})

router.get("/public/:id", async (req, res)=> {
    const { id } = req.params

    const file = await prisma.file.findUnique({
        where: { id }
    })

    if(!file) {
        return res.status(404).json({ error: "File not found" })
    }

    const filePath = path.join(process.cwd(), "uploads", file.path)

    if(!fs.existsSync(filePath)) {
        res.status(404).json({ error: "File not found in disk" })
    }

    return res.download(filePath, file.name)
})

//DELETE
router.delete("/:id", authMiddleware, async (req, res)=> {
    const { id } = (req as any).params
    const userId = req.userId

    const file = await prisma.file.findFirst({
        where: {
            id,
            userId
        }
    })

    if(!file) {
        return res.status(404).json({ error: "File not found" })
    }

    const filePath = path.resolve("uploads", file.path)

    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }

    await prisma.file.delete({
        where: { id }
    })

    return res.json({ message: "File deleted" })
})

export default router