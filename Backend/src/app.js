import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const app = express()
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ limit: '20kb', extended: true }))
app.use(cookieParser())

export default app;

import { userRoute } from "./routes/user.routes.js";
import { taskRoute } from "./routes/task.routes.js";

app.use("/api/user", userRoute)
app.use("/api/task", taskRoute)