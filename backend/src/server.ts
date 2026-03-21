import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import fileRoutes from "./routes/file.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/files", fileRoutes)

app.listen(3000, () => {
  console.log("Server running on Http://localhost:3000")
})