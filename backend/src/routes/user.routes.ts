import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.get("/me", authMiddleware, (req, res)=> {
    return res.json({
        message: "Rota Protegida!",
        userId: req.userId
    })
})

export default router