import express from 'express'
import * as dotenv from 'dotenv'
import cors from "cors"
import connectDb from './mongoDb/connect.js'

import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)

app.get('/', async (req, res) => {
   res.send("hello world")
})

const startServer = async () => {
   try {
      connectDb(process.env.MONGODB_URL)
   } catch (error) {
      console.log(error);
   }
   app.listen(8080, () => console.log("server running at 8080 http://localhost:8080"))
}

startServer()