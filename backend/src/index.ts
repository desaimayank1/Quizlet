import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import testRouter from "./routes/test.route"
const app:Express = express();
dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(cors({
   origin:"*"
}))
app.use(express.json());

app.get("/", (req:Request, res:Response) => {
    res.status(200).json({success:true,message:"Server running on localhost:3000..."})
})

app.use("/test",testRouter)

app.listen(PORT, () => {
    console.log("server is running on localhost3000");
})