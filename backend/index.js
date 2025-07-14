import dotenv from  "dotenv";
import express from "express";
import cors from "cors";
import ConnectDb from "./config/db.js";
import userRoute from  "./routes/userRoutes.js"
dotenv.config();
const app = express();
ConnectDb();

//  basic step up 
app.use(express.json());
app.use(cors());

// api 
app.get("/" , (req,res)=>{
    res.json({messege : "Default route"})
})
app.use("/api" , userRoute)

app.listen(3000 , ()=>{
    console.log("Server is running at " , 3000);
})