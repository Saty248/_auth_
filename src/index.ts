import express from "express";

import 'dotenv/config'
import cookieParser from "cookie-parser";
import router from "./routes"

const app=express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("",router())



const start=async()=>{
    try {
        app.listen(process.env.PORT,()=>{
            console.log(`connected to port ${process.env.PORT}`)
        })
    } catch (error) {
        
    }
}
start();