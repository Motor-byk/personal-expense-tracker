import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./configuration/connection.js";

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());



mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listing on port ${PORT}`);
    });
})

