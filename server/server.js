import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./configuration/connection.js";
import User from "./model/User.js";
import Week from "./model/Week.js";

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//users
app.get("/api/users/create", async(req, res) => {
    try {
        const savedUser = await User.create({email:"test@gmail.com", passwordHash: "testpasword", weeklyAllowance: 100});
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get("/api/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
        console.log("Fetched user data");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listing on port ${PORT}`);
    });
})



