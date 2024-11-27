import app from "./app.js";
import { dbConnect } from "./db/dbconnection.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const Port = process.env.PORT

dbConnect()

    .then(() => {
        app.on('error', (error) => {
            console.log(`failed to connect ${error}`)
        })

        app.listen(Port, () => {
            console.log(`server is listening at port = ${process.env.PORT}`)
        })
    })

    .catch((error) => {
        console.log(`somthing went wrong`, error)
    })
