import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router()
const controller = new authController()

router.post("/register", controller.register)
router.post("/login", controller.login)

export default router