import mongoose from "mongoose";
import { DB_NAME } from "../constrant.js";

export const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log("DATABASE CONNECTED SUCESSFULLY", connection.connection.name.toUpperCase())
    } catch (error) {
        console.log("FAILED TO CONNECT WITH DATABASE")
        process.exit(1)
    }
}
